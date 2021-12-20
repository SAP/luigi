import visit from 'unist-util-visit';

export default function oldVersion() {
  return function transformer(tree) {
    visit(tree, 'element', function(node) {
      if (node.type === 'comment' && node.value.trim() === 'oldVersionsDropdown') {
        console.log('#################### FOUND COMMENT');
      }
    });
  };
}
