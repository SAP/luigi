import visit from 'unist-util-visit';
import h from 'hastscript';

export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, ['comment'], function(node, index, parent) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        const oldVerDropdown = h('select.oldverdrop');
        parent.children.splice(index + 1, 0, oldVerDropdown);
        fetch('https://api.github.com/repos/SAP/luigi/tags').then(response => {
          response.json().then(tags => {
            tags.forEach(tag => {
              const tagOption = h('option', tag.name);
              oldVerDropdown.children.push(tagOption);
            });
          });
        });
      }
    });
  };
}
