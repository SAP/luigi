import { visit } from 'unist-util-visit';

/**
 * Plugin to transform special comment tags into HTML elements.
 * Converts comments in the form of `label-classname: text` into
 * `div` elements containing `span` elements with the specified class and text.
 *
 * @returns {function} Transformer function for the Markdown AST.
 *
 * @example
 * // Input:
 * // <!-- label-info: This is an info label -->
 * //
 * // Output:
 * // <div class="label-wrapper">
 * //   <span class="label-info">This is an info label</span>
 * // </div>
 */
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

  /**
   * Transforms a comment node into a label element.
   *
   * @param {Object} node - The AST node representing the comment.
   * @param {number} index - The index of the node in the parent's children array.
   * @param {Object} parent - The parent AST node.
   * @param {string} className - The class name for the label.
   * @param {string} labelText - The text content of the label.
   *
   * @example
   *    Input Node:
   *    { type: 'comment', value: ' label-info: This is an info label ' }
   *   
   *    Output Node:
   *    {
   *      type: 'element',
   *      tagName: 'div',
   *      properties: { className: 'label-wrapper' },
   *      children: [
   *        {
   *          type: 'element',
   *          tagName: 'span',
   *          properties: { className: 'label-info' },
   *          children: [{ type: 'text', value: 'This is an info label' }]
   *        }
   *      ]
   *    }
   */
  function transformToLabel(node, index, parent, className, labelText) {
    const labelNode = {
      type: 'element',
      tagName: 'span',
      properties: { className: `label-${className}` },
      children: [{ type: 'text', value: labelText }]
    };

    const divNode = {
      type: 'element',
      tagName: 'div',
      properties: { className: 'label-wrapper' },
      children: [labelNode]
    };

    parent.children.splice(index, 1, divNode);
  }
}
