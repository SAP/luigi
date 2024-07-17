import { visit } from 'unist-util-visit';

export default function addLabelTag() {
  return function transformer(tree) {
    visit(tree, ['comment'], (node, index, parent) => {
      const trimmedValue = node.value.trim();
      const match = trimmedValue.match(/^label-(\w+):\s*(.*)$/);

      if (match) {
        const className = match[1];
        const labelText = match[2];
        transformToLabel(node, index, parent, className, labelText);
      }
    });
  };

  function transformToLabel(node, index, parent, className, labelText) {
    const labelNode = {
      type: 'element',
      tagName: 'span',
      properties: { className: `label-${className}` },
      children: [{ type: 'text', value: labelText }],
    };

    parent.children.splice(index, 1, labelNode);
  }
}
