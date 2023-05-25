import { visit } from 'unist-util-visit';
import { writeFileSync, readFileSync } from 'fs';
import orderBy from 'lodash.orderby';
// public instead, then change it TODO
import path from 'path';
var __dirname = path.resolve();
var staticLuigiFolder = __dirname + '/../../public/';
console.log('staticLuigiFolder:', staticLuigiFolder);
var staticNavigationFilePath = staticLuigiFolder + 'navigation-nodes.json';
var generatedNavigationFilePath = staticLuigiFolder + 'navigation-generated.json';
var staticNavigation = readFileSync(staticNavigationFilePath);
writeFileSync(generatedNavigationFilePath, String(staticNavigation));
export default function luigiNavigationBuilder(data) {
  if (data === void 0) {
    data = {};
  }
  return function transformer(tree) {
    var navItems = JSON.parse(String(readFileSync(generatedNavigationFilePath)));
    visit(tree, ['json'], function(node) {
      var navData = Object.assign({}, data, parseFrontmatter(node.value));
      navItems.push(generateNavItem(navData));
      node.value = ''; // clear, to not produce html output
    });
    // sort by metaData.categoryPosition AND metaData.position
    var navItemsSorted = orderBy(navItems, ['metaData.categoryPosition', 'metaData.position']);
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
function generateNavItem(d) {
  if (!d.node || !d.node.label) {
    console.warn('WARNING: possible invalid frontmatter data', d);
  }
  var navItem = Object.assign({}, d.node, {
    label: (d.node && d.node.label) || d.shortName,
    pathSegment: d.shortName,
    navigationContext: 'doc',
    keepSelectedForChildren: true,
    viewUrl: '__BASE_URL__/docs/'.concat(d.shortName)
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
//# sourceMappingURL=remark-generate-luigi-navigation.js.map
