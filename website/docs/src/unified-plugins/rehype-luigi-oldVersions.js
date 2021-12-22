import visit from 'unist-util-visit';
import h from 'hastscript';

export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, 'element', function(node) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        const oldVerDropdown = h('div.oldverdrop');
        Object.assign(node, oldVerDropdown);
      }
    });
  };
}
