const fs = require('fs');
let unitData;
let unitTotal;
let e2eData;
let e2eTotal;

try {
  unitData = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
  unitTotal = unitData ? Object.entries(unitData.total) : null;
} catch (error) {
  console.log('<p style="color:red">Source file for unit tests not found!</p>');
}

try {
  e2eData = JSON.parse(fs.readFileSync('e2e-coverage/coverage-summary.json', 'utf8'));
  e2eTotal = e2eData ? Object.entries(e2eData.total) : null;
} catch (error) {
  console.log('<p style="color:red">Source file for e2e tests not found!</p>');
}

const fileList = unitData ? Object.keys(unitData).filter((key) => key !== 'total') : [];
const sortedList = fileList.map((item) => item.split('\\').pop()).sort();
const parseData = (data, name) => {
  return Object.entries(
    Object.keys(data)
      .filter((key) => key.includes(name))
      .reduce((obj, key) => data[key], {})
  );
};

function buildHtml() {
  const buildTable = (unitStats, e2eStats) => {
    let unitHighlight = '';
    let e2eHighlight = '';

    if (Number(unitStats[0][1].pct) > Number(e2eStats[0][1].pct)) {
      unitHighlight = 'highlighted';
    }

    if (Number(unitStats[0][1].pct) < Number(e2eStats[0][1].pct)) {
      e2eHighlight = 'highlighted';
    }

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
        </tbody>
      </table>
    `;

    return table;
  };
  const totalTable =
    unitTotal && e2eTotal ? buildTable(unitTotal, e2eTotal) : '<p>Not enough data to show results :(</p>';
  let fileData = '';

  if (unitData && e2eData) {
    for (let i = 0; i < sortedList.length; i++) {
      const headline = `<h2>Stats for '${sortedList[i]}'</h2>`;
      const unitOutput = parseData(unitData, `\\${sortedList[i]}`);
      const e2eOutput = parseData(e2eData, `\\${sortedList[i]}`);
      let table = '<p>Not enough data for this file :(</p>';

      if (unitOutput && e2eOutput) {
        table = buildTable(unitOutput, e2eOutput);
      }

      fileData += headline;
      fileData += table;
    }
  }

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
      .headline td {
        background: #eee;
        font-style: normal;
        letter-spacing: 1px;
        text-align: center;
        text-transform: uppercase;
      }
      .highlighted td:not(:first-child) {
        background: #e6f5d0;
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
