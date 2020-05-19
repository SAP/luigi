import visit from 'unist-util-visit';
import h from 'hastscript';

/**
 * This unified plugin function adds keyword labels
 * example markdown comment: <!-- keywords: key1, key2-->
 * result : <div class="keyword-container">
 *              <label class="keyword">key1</label>
 *              <label class="keyword">key2</label> 
 *          </div>
 */
export default function addKeyWords() {
  return function transformer(tree) {
    visit(tree, ['element', 'comment'], function (node) {
      processComment(node);
    });
  }

  function processComment(node) {
    if (node.type === 'comment') {
      if (node.value.trim().startsWith('keywords')) {
        const parts = node.value.trim().split(':');
        // retrieve the list of words from the comment
        const words = parts[1].split(',').map( word => {
            return word.trim()
        });
        // check if no keywords added
        // When the string is empty, split returns an array containing one empty string
        if (words[0] != '') {
            // create a div containing multiple labels
            const newNodeData = h('div.keyword-container', 
                words.map( word => {
                    return h('label.keyword', [ word ] )
                })
            );
            Object.assign(node, newNodeData);
        }
      }
    }
  }
}