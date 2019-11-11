import has from 'hast-util-has-property';
import url from 'url';
import visit from 'unist-util-visit';

export default function transform () {
  return function transformer (tree) {
    visit(tree, 'element', function (node) {
      modify(node, 'href');
    });
  }

  function modify (node, prop) {
    if (has(node, prop)) {
      var parsed = url.parse(node.properties[prop]);
      console.log(prop, 'href logic to be implemented');
      // node.properties[prop] = fn(parsed)
      // add logic here
    }
  }
}