import visit from 'unist-util-visit';
import h from 'hastscript';
import versions from '../../static/versions.json';

export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, ['comment'], function(node, index, parent) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        const wrapper = h('div.custom-select');
        const oldVerDropdown = h('select.oldverdrop');
        oldVerDropdown.properties.onchange =
          "window.open('https://github.com/SAP/luigi/blob/' + event.target.value + '/docs/README.md', '_blank');";
        wrapper.children.push(oldVerDropdown);
        parent.children.splice(index + 1, 0, wrapper);
        const tagLinks = [];
        versions.forEach(tag => {
          if (tag.name.indexOf('v') === 0) {
            tagLinks.push(tag);
          }
        });
        tagLinks.forEach(tag => {
          const tagOption = h('option', tag.name);
          oldVerDropdown.children.push(tagOption);
        });
      }
    });
  };
}
