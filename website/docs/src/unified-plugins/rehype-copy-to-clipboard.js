import h from 'hastscript';
import has from 'hast-util-has-property';
import visit from 'unist-util-visit';
import fs from 'fs';

let log = () => {}
if (process.env.NODE_ENV === 'debug') {
  const debugFile =  __dirname + '/debug.log';
  fs.writeFileSync(debugFile, '');
  log = (text = '') => {
    fs.appendFileSync(debugFile, text);
  }
}

export default function addCopyToClipboard() {
  return function transformer(tree) {
    visit(tree, 'element', function (node) {
      modify(node, 'code');
    });
  }

  function modify(node, prop) {
    if (node.tagName === 'pre') {
      // Docu: https://github.com/syntax-tree/hastscript#use
      const copyCode = h('a.copyCode', { onclick: 'copyCode(event, this)' }, [
        h('div', [
          h('img', { src: '/assets/copy-clipboard-default.svg' }),
          h('.popoverCopy', [
            'Click to copy'
          ]),
        ]),
      ]);
      node.children.unshift(copyCode);
    }
  }
}