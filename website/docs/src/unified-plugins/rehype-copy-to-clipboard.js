import h from 'hastscript';
import visit from 'unist-util-visit';

export default function addCopyToClipboard() {
  return function transformer(tree) {
    visit(tree, 'element', function (node) {
      modify(node, 'code');
    });
  }

  function modify(node, prop) {
    const notYetProcessed = !node.properties.className || node.properties.className.indexOf('canCopyCode') === -1; // prevent infinite loop
    if (node.tagName === 'pre' && notYetProcessed) {
      // Docu: https://github.com/syntax-tree/hastscript#use
      const newNodeData = h('div.copyCodeContainer', [
        h('a.copyCode', { onclick: 'copyCode(event, this)' }, 
          [h('div', [
            h('img', { src: '/images/copy-clipboard-default.svg' }),
            h('.popoverCopy', [
              'Click to copy'
            ])]
          )]
        ),
        h('pre.canCopyCode', node.children)
      ]);
      Object.assign(node, newNodeData);
    }
  }
}