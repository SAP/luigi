const fs = require('fs');
let unitData;
let unitTotal;
let e2eData;
let e2eTotal;

/**
 * Fetching source code coverage stats for unit tests - error is shown in case of failure
 */
try {
  unitData = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
  /**
   * Code coverage data for unit tests - total stats only
   */
  unitTotal = unitData ? Object.entries(unitData.total) : null;
} catch (error) {
  console.log('<p style="color:red">Source file for unit tests not found!</p>');
  throw new Error(error);
}

/**
 * Fetching source code coverage stats for e2e tests - error is shown in case of failure
 */
try {
  e2eData = JSON.parse(fs.readFileSync('e2e-coverage/coverage-summary.json', 'utf8'));
  /**
   * Code coverage data for e2e tests - total stats only
   */
  e2eTotal = e2eData ? Object.entries(e2eData.total) : null;
} catch (error) {
  console.log('<p style="color:red">Source file for e2e tests not found!</p>');
  throw new Error(error);
}

/**
 * Refined code coverage data for unit tests - without total stats
 */
const unitList = unitData ? Object.keys(unitData).filter((key) => key !== 'total') : [];
/**
 * Refined code coverage data for e2e tests - without total stats
 */
const e2eList = e2eData ? Object.keys(e2eData).filter((key) => key !== 'total') : [];
/**
 * List of files for further processing
 */
const fileList = new Set(unitList);
const zeroVals = {
  covered: 0,
  pct: 0,
  skipped: 0,
  total: 0
};

/**
 * Making sure both data for unit and e2e tests have the same files
 */
e2eList.forEach((item) => {
  fileList.add(item);
});
fileList.forEach((filename) => {
  if (!unitData[filename]) {
    unitData[filename] = {
      branches: zeroVals,
      functions: zeroVals,
      lines: zeroVals,
      statements: zeroVals
    };
  }

  if (!e2eData[filename]) {
    e2eData[filename] = {
      branches: zeroVals,
      functions: zeroVals,
      lines: zeroVals,
      statements: zeroVals
    };
  }
});

/**
 * Sorted list of file names for better readability
 */
const sortedList = Array.from(fileList)
  .map((item) => {
    if (item.includes('\\')) {
      return item.split('\\').pop();
    }

    return item.split('/').pop();
  })
  .sort();
/**
 * Helper function to parse the test data
 * @param {object} data data chunk to be parsed
 * @param {string} name name of the file to be parsed
 */
const parseTestData = (data, name) => {
  return Object.entries(
    Object.keys(data)
      .filter((key) => key.includes(name))
      .reduce((obj, key) => data[key], {})
  );
};

/**
 * Method to build the HTML content for the given data
 */
function buildHtml() {
  /**
   * Helper function to build combined results for both unit and e2e tests
   */
  const buildCombinedResults = () => {
    const unionStats = [];

    for (let x = 0; x < 4; x++) {
      let total = 0;
      let covered = 0;
      let skipped = 0;

      for (let y = 0; y < sortedList.length; y++) {
        const unitParsedData = parseTestData(unitData, `${sortedList[y]}`);
        const e2eParsedData = parseTestData(e2eData, `${sortedList[y]}`);
        const getParamValue = (index, param) => {
          const unitStats = unitParsedData.filter((item) => item[0] === unitTotal[x][0]);
          const e2eStats = e2eParsedData.filter((item) => item[0] === unitTotal[x][0]);

          return Number(unitStats[index][1][param]) < Number(e2eStats[index][1][param])
            ? Number(e2eStats[index][1][param])
            : Number(unitStats[index][1][param]);
        };

        total = total + getParamValue(0, 'total');
        covered = covered + getParamValue(0, 'covered');
        skipped = skipped + getParamValue(0, 'skipped');
      }

      const pct = !isNaN(covered / total) ? Math.floor((covered / total) * 100) : 0;

      unionStats.push([unitTotal[x][0], { total, covered, skipped, pct }]);
    }

    return unionStats;
  };
  /**
   * Helper function to build the HTML table for the given data
   * @param {object} unitStats data chunk for unit test to be parsed
   * @param {object} e2eStats data chunk for e2e test to be parsed
   * @param {boolean} combinedResults to include combined results or not
   */
  const buildTable = (unitStats, e2eStats, combinedResults) => {
    const unionStats = combinedResults ? buildCombinedResults() : null;
    let unitHighlight = '';
    let e2eHighlight = '';

    if (Number(unitStats[0][1].pct) > Number(e2eStats[0][1].pct)) {
      unitHighlight = 'highlighted';
    }

    if (Number(unitStats[0][1].pct) < Number(e2eStats[0][1].pct)) {
      e2eHighlight = 'highlighted';
    }

    const summary = unionStats
      ? `
      <tr class="headline">
        <td colspan="5">&laquo; combined results &raquo;</td>
      </tr>
      <tr class="combined">
        <td>${unionStats[0][0]}</td>
        <td>${unionStats[0][1].total}</td>
        <td>${unionStats[0][1].covered}</td>
        <td>${unionStats[0][1].skipped}</td>
        <td>${unionStats[0][1].pct}%</td>
      </tr>
      <tr class="combined">
        <td>${unionStats[1][0]}</td>
        <td>${unionStats[1][1].total}</td>
        <td>${unionStats[1][1].covered}</td>
        <td>${unionStats[1][1].skipped}</td>
        <td>${unionStats[1][1].pct}%</td>
      </tr>
      <tr class="combined">
        <td>${unionStats[2][0]}</td>
        <td>${unionStats[2][1].total}</td>
        <td>${unionStats[2][1].covered}</td>
        <td>${unionStats[2][1].skipped}</td>
        <td>${unionStats[2][1].pct}%</td>
      </tr>
      <tr class="combined">
        <td>${unionStats[3][0]}</td>
        <td>${unionStats[3][1].total}</td>
        <td>${unionStats[3][1].covered}</td>
        <td>${unionStats[3][1].skipped}</td>
        <td>${unionStats[3][1].pct}%</td>
      </tr>
    `
      : '';
    const table = `
      <table>
        <thead>
          <tr>
            <th></th>
            <th>total</th>
            <th>covered</th>
            <th>skipped</th>
            <th>percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr class="headline">
            <td colspan="5">&laquo; unit tests &raquo;</td>
          </tr>
          <tr class="${unitHighlight}">
            <td>${unitStats[0][0]}</td>
            <td>${unitStats[0][1].total}</td>
            <td>${unitStats[0][1].covered}</td>
            <td>${unitStats[0][1].skipped}</td>
            <td>${unitStats[0][1].pct}%</td>
          </tr>
          <tr class="${unitHighlight}">
            <td>${unitStats[1][0]}</td>
            <td>${unitStats[1][1].total}</td>
            <td>${unitStats[1][1].covered}</td>
            <td>${unitStats[1][1].skipped}</td>
            <td>${unitStats[1][1].pct}%</td>
          </tr>
          <tr class="${unitHighlight}">
            <td>${unitStats[2][0]}</td>
            <td>${unitStats[2][1].total}</td>
            <td>${unitStats[2][1].covered}</td>
            <td>${unitStats[2][1].skipped}</td>
            <td>${unitStats[2][1].pct}%</td>
          </tr>
          <tr class="${unitHighlight}">
            <td>${unitStats[3][0]}</td>
            <td>${unitStats[3][1].total}</td>
            <td>${unitStats[3][1].covered}</td>
            <td>${unitStats[3][1].skipped}</td>
            <td>${unitStats[3][1].pct}%</td>
          </tr>
          <tr class="headline">
            <td colspan="5">&laquo; e2e tests &raquo;</td>
          </tr>
          <tr class="${e2eHighlight}">
            <td>${e2eStats[0][0]}</td>
            <td>${e2eStats[0][1].total}</td>
            <td>${e2eStats[0][1].covered}</td>
            <td>${e2eStats[0][1].skipped}</td>
            <td>${e2eStats[0][1].pct}%</td>
          </tr>
          <tr class="${e2eHighlight}">
            <td>${e2eStats[1][0]}</td>
            <td>${e2eStats[1][1].total}</td>
            <td>${e2eStats[1][1].covered}</td>
            <td>${e2eStats[1][1].skipped}</td>
            <td>${e2eStats[1][1].pct}%</td>
          </tr>
          <tr class="${e2eHighlight}">
            <td>${e2eStats[2][0]}</td>
            <td>${e2eStats[2][1].total}</td>
            <td>${e2eStats[2][1].covered}</td>
            <td>${e2eStats[2][1].skipped}</td>
            <td>${e2eStats[2][1].pct}%</td>
          </tr>
          <tr class="${e2eHighlight}">
            <td>${e2eStats[3][0]}</td>
            <td>${e2eStats[3][1].total}</td>
            <td>${e2eStats[3][1].covered}</td>
            <td>${e2eStats[3][1].skipped}</td>
            <td>${e2eStats[3][1].pct}%</td>
          </tr>
          ${summary}
        </tbody>
      </table>
    `;

    return table;
  };
  const totalTable =
    unitTotal && e2eTotal ? buildTable(unitTotal, e2eTotal, true) : '<p>Not enough data to show results :(</p>';
  let fileData = '';

  /**
   * Loop through the files and build the HTML table for each of them
   */
  if (unitData && e2eData) {
    for (let i = 0; i < sortedList.length; i++) {
      const headline = `<h2>Stats for '${sortedList[i]}'</h2>`;
      const unitOutput = parseTestData(unitData, `${sortedList[i]}`);
      const e2eOutput = parseTestData(e2eData, `${sortedList[i]}`);
      let table = '<p>Not enough data for this file :(</p>';

      if (unitOutput && e2eOutput) {
        table = buildTable(unitOutput, e2eOutput);
      }

      fileData += headline;
      fileData += table;
    }
  }

  /**
   * HTML page structure with basic styling
   */
  const header = `
    <title>Code coverage summary</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        background: #fff;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        font-variant-numeric: tabular-nums;
      }
      table {
        border: 1px solid black;
        border-collapse: collapse;
        margin-bottom: 2rem;
        max-width: 1200px;
        table-layout: fixed;
        text-align: center;
        width: 100%;
      }
      th, td {
        padding: 0 .5rem;
      }
      th {
        line-height: 2;
        text-transform: capitalize;
      }
      td {
        border: 1px solid black;
      }
      td:first-child {
        font-style: italic;
        text-align: left;
      }
      .headline {
        border-top: 2px solid black;
      }
      .headline td {
        background: rgb(238, 238, 238);
        font-style: normal;
        letter-spacing: 1px;
        text-align: center;
        text-indent: 20%;
        text-transform: uppercase;
      }
      .highlighted td:not(:first-child) {
        background: rgb(230, 245, 208);
      }
      .combined td:not(:first-child) {
        background: rgb(242, 223, 149);
      }
    </style>
  `;
  const body = `
    <h1>Code coverage summary</h1>
    <h2>Total stats</h2>
    ${totalTable}
    ${fileData}
  `;

  return `<!DOCTYPE html><html lang="en">
    <head>${header}</head>
    <body>${body}</body>
  </html>`;
}

const html = buildHtml();

// Dumping the file directly into `stdout`
console.log(html);
