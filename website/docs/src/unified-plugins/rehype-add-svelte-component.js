import visit from 'unist-util-visit';
import requireFromString from 'require-from-string';
import unified from 'unified'
import parse from 'rehype-parse'
const svelte = require('svelte/compiler');

  /**
   * This unified plugin function adds svelte components
   * example markdown comment: 
   * <!-- svelte: 
   *  <script>
   *    let name = 'World!';
   *  </script>
   *
   *  <h1>Hello {name.toUpperCase()}!</h1>
   * -->
   * result : <h1>Hello WORLD! </h1>
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
          const words = node.value.trim().substr(node.value.trim().indexOf(':') + 1);
          if (words != '') {
            const results = svelte.compile(words, {
              format: "cjs",
              generate: "ssr",
              css: true,
            });
        
            let component = requireFromString(results.js.code).default
  
            const { head, html, css } = component.render();
            // css parsed to hast tree, but couldn't join to node - future improvement ?
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
