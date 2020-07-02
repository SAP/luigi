import visit from 'unist-util-visit';
import unified from 'unified'
import parse from 'rehype-parse'

  /**
   * This unified plugin function adds svelte components
   * example markdown comment: 
   * <!-- svelte:mock.svelte -->
   * -->
   * result : output of mock.svelte
   */
  export default function addSvelteComponents() {
    return function transformer(tree) {
      visit(tree, ['element', 'comment'], function (node) {
        processComment(node);
      });
    }

    async function processComment(node) {
      if (node.type === 'comment') {
        if (node.value.trim().startsWith('svelte')) {
          // split string after first semicolon
          const words = node.value.trim().substr(node.value.trim().indexOf(':') + 1).trim();
          if (words != '') {            
            let component = require("../../../../docs/components/" + words).default;
            const { head, html, css } = component.render();
            // TODO: css parsed to hast tree, but couldn't join to node - future improvement ?
            // var parseSelector = require('hast-util-parse-selector')
            // var CSS = parseSelector(css.code)
  
            var tree = unified()  
            .use(parse)
            .parse(html)
            Object.assign(node, tree);
          }
        }
      }
    }
  }
