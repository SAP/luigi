  import visit from 'unist-util-visit';
  import h from 'hastscript';
import { stringify } from 'querystring';
const unified = require('unified')
const parse = require('rehype-parse')

  // import {render} from 'svelte/register';

  /**
   * This unified plugin function adds keyword labels
   * example markdown comment: <!-- keywords: key1, key2-->
   * result : <div class="keyword-container">
   *              <label class="keyword">key1</label>
   *              <label class="keyword">key2</label> 
   *          </div>
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
          // console.log("---raw node", node);
          const words = node.value.trim().substr(node.value.trim().indexOf(':') + 1);
          var component = require('../../docu_component.svelte').default;
          const { head, html, css } = component.render();
          var tree = unified()
          .use(parse)
          .parse(html)
          Object.assign(node, tree);
          
        
        }
      }
    }
  }



