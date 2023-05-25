import { visit } from 'unist-util-visit';
import { writeFile, readFile, writeFileSync, readFileSync, readdirSync } from 'fs';
import orderBy from 'lodash.orderby';

// public instead, then change it TODO
import path from 'path';
const __dirname = path.resolve();

const staticLuigiFolder = __dirname + '/../../public/';
console.log('staticLuigiFolder:', staticLuigiFolder);

const staticNavigationFilePath = staticLuigiFolder + 'navigation-nodes.json';
const generatedNavigationFilePath = staticLuigiFolder + 'navigation-generated.json';

const staticNavigation = readFileSync(staticNavigationFilePath);
writeFileSync(generatedNavigationFilePath, String(staticNavigation));

export default function luigiNavigationBuilder(data = {}) {
  return function transformer(tree: any) {
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

    // readFile(staticNavigationFilePath, (err, staticNavigation) => {
    //   // initially write static navigation items to file
    //   writeFile(generatedNavigationFilePath, String(staticNavigation), () => {

    //     readFile(generatedNavigationFilePath, 'utf8', (err, items) => {
    //       const navItems = JSON.parse(items);
    //       visit(tree, ['json'], function (node) {
    //         const navData = Object.assign({}, data, parseFrontmatter(node.value));
    //         navItems.push(generateNavItem(navData));
    //         node.value = ''; // clear, to not produce html output
    //       });

    //       // sort by metaData.categoryPosition AND metaData.position
    //       const navItemsSorted = orderBy(navItems, ['metaData.categoryPosition', 'metaData.position']);

    //       // write to navigationFile
    //       writeFile(generatedNavigationFilePath, JSON.stringify(navItemsSorted, null, 2), () => { });
    //     })

    //   });
    // });
  };
}

function generateNavItem(d: any) {
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

function IsJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function parseFrontmatter(str: string) {
  if (!IsJsonString(str)) {
    console.error('ERROR, invalid json', str);
  }
  return JSON.parse(str);
}
