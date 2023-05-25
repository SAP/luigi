import { visit } from 'unist-util-visit';
var modifiers = [];
export default function addCopyToClipboard() {
  return function transformer(tree) {
    visit(tree, ['element', 'comment'], function(node) {
      processComment(node);
      if (modifiers.length && node.type === 'element') {
        addAttributes(node);
      }
    });
  };
  function processComment(node) {
    if (node.type === 'comment') {
      if (node.value.trim().startsWith('add-attribute')) {
        // console.log('comment node', node.value.trim());
        var parts = node.value.trim().split(':');
        modifiers.push({
          attr: parts[1],
          value: parts[2]
        });
      }
    }
  }
  function addAttributes(node) {
    // foreach attribute add
    modifiers.forEach(function(m) {
      node.properties[m.attr] = m.value;
    });
    // clear attributes for next run
    modifiers = [];
  }
}
//# sourceMappingURL=rehype-add-custom-attributes.js.map
