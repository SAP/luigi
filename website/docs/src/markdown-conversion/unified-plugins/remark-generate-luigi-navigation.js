import { visit } from 'unist-util-visit';
import { writeFile, readFile, writeFileSync, readFileSync, readdirSync } from 'fs';
import orderBy from 'lodash.orderby';

// public instead, then change it TODO
import path from 'path';
const __dirname = path.resolve();

const staticLuigiFolder = __dirname + '/public/';

const staticNavigationFilePath = staticLuigiFolder + 'navigation-nodes.json';
const generatedNavigationFilePath = staticLuigiFolder + 'navigation-generated.json';

const staticNavigation = readFileSync(staticNavigationFilePath);
writeFileSync(generatedNavigationFilePath, String(staticNavigation));

export default function luigiNavigationBuilder(data = {}) {
  return function transformer(tree) {
    const navItems = JSON.parse(String(readFileSync(generatedNavigationFilePath)));

    visit(tree, ['json'], function(node) {
      const navData = Object.assign({}, data, parseFrontmatter(node.value));
      navItems.push(generateNavItem(navData));
      node.value = ''; // clear, to not produce html output
    });

    // sort by metaData.categoryPosition AND metaData.position
    const navItemsSorted = orderBy(navItems, ['metaData.categoryPosition', 'metaData.position']);

    // write to navigationFile
    writeFileSync(generatedNavigationFilePath, JSON.stringify(navItemsSorted, null, 2));
  };
}

function generateNavItem(d) {
  if (!d.node || !d.node.label) {
    console.warn('WARNING: possible invalid frontmatter data', d);
  }

  const navItem = Object.assign({}, d.node, {
    label: (d.node && d.node.label) || d.shortName,
    pathSegment: d.shortName,
    navigationContext: 'doc',
    keepSelectedForChildren: true,
    viewUrl: `__BASE_URL__/docs/${d.shortName}`
  });
  return navItem;
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function parseFrontmatter(str) {
  if (!IsJsonString(str)) {
    console.error('ERROR, invalid json', str);
  }
  return JSON.parse(str);
}
