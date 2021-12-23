import visit from 'unist-util-visit';
import h from 'hastscript';
import versions from '../../static/versions.json';

export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, ['comment'], function(node, index, parent) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        const oldVerDropdown = h('select.oldverdrop');
        parent.children.splice(index + 1, 0, oldVerDropdown);
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
