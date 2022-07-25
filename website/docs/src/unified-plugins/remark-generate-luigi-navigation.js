import visit from 'unist-util-visit';
import { readFileSync, writeFileSync } from 'fs';
import orderBy from 'lodash.orderby';

const staticLuigiFolder = 'static/luigi/';
const navigationFile = staticLuigiFolder + 'navigation-generated.json';
const staticNavigation = readFileSync(staticLuigiFolder + 'navigation-nodes.json');

// initially write static navigation items to file
writeFileSync(navigationFile, String(staticNavigation));

export default function luigiNavigationBuilder(data = {}) {
  return function transformer(tree) {
    const navItems = JSON.parse(readFileSync(navigationFile));
    visit(tree, ['json'], function(node) {
      const navData = Object.assign({}, data, parseFrontmatter(node.value));
      navItems.push(generateNavItem(navData));
      node.value = ''; // clear, to not produce html output
    });

    // sort by metaData.categoryPosition AND metaData.position
    const navItemsSorted = orderBy(navItems, ['metaData.categoryPosition', 'metaData.position']);

    // write to navigationFile
    writeFileSync(navigationFile, JSON.stringify(navItemsSorted, null, 2));
  };

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
}
