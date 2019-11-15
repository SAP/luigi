import visit from 'unist-util-visit';
import { writeFileSync, readFileSync } from 'fs';
import orderBy from 'lodash.orderby';

const staticLuigiFolder = __dirname + '/../../static/luigi/';
const navigationFile = staticLuigiFolder + 'navigation-generated.json';
writeFileSync(navigationFile, '[]');

export default function luigiNavigationBuilder(data = {}) {
  
  return function transformer(tree) {
    const navItems = JSON.parse(readFileSync(navigationFile));
    visit(tree, 'yaml', function (node) {
      const navData = Object.assign({}, data, parseYaml(node.value));
      navItems.push(generateNavItem(navData));
    });
    
    // sort by metaData.categoryPosition AND metaData.position
    const navItemsSorted = orderBy(navItems, ['metaData.categoryPosition', 'metaData.position']);

    // write to navigationFile
    writeFileSync(navigationFile, JSON.stringify(navItemsSorted, null, 2));
  }

  function generateNavItem(d) {
    const navItem = {
      label: d.label || d.shortName,
      pathSegment: d.shortName,
      navigationContext: 'doc',
      keepSelectedForChildren: true,
      viewUrl: `__BASE_URL__/docs/${d.shortName}`,
      hideFromNav: d.hideFromNav && Boolean(d.hideFromNav) || false
    };
    if (d.category) {
      navItem['category'] = {
        "label": d.category
      }
    }
    navItem['metaData'] = {
      position: parseInt(d.position) || 10,
      categoryPosition: parseInt(d.categoryPosition) || 10
    };
    return navItem;
  }

  function parseYaml(str) {
    const valueArr = str
      .split('\n')
      .map(line => {
        return line.split(':')
          .map(v => v.trim());
      });
    const values = {};
    valueArr.forEach(v => {
      values[v[0]] = v[1];
    });
    return values;
  }
}