import visit from 'unist-util-visit';
import { writeFileSync, readFileSync, readdirSync } from 'fs';
import orderBy from 'lodash.orderby';

const staticLuigiFolder = 'static/luigi/';
const navigationFile = staticLuigiFolder + 'navigation-generated.json';
const staticNavigation = readFileSync(staticLuigiFolder + 'navigation-nodes.json');

// initially write static navigation items to file
writeFileSync(navigationFile, String(staticNavigation));

export default function luigiNavigationBuilder(data = {}) {
  
  return function transformer(tree) {
    const navItems = JSON.parse(readFileSync(navigationFile));
    visit(tree, ['json'], function (node) {
      const navData = Object.assign({}, data, parseFrontmatter(node.value));
      navItems.push(generateNavItem(navData));
      node.value = ''; // clear, to not produce html output
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

  function parseFrontmatter(str) {
    return JSON.parse(str);
  }
}