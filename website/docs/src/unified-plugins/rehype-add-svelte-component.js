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
          // console.log(__filename, "asdadadsdadadadads")
          // await fs.writeFile(filename, words, function (err) {
          //   if (err) return console.log(err);
          //    console.log("written")
          //    component = require("../../zello.svelte").default;
          // })
          // var requireFromString = require('require-from-string');
    
        //   var fs  = require("fs");
        //   var tmp = require("tmp");

        //   tmp.file({prefix: 'projectA-', postfix: '.svelte', keep: false}, function (err, path, fd, cleanupCallback) {
        //     if (err) throw err;
        
        //     console.log("File: ", path);
        //     console.log("Filedescriptor: ", fd);
        //     fs.writeFileSync(path, words)
        //     component = require(path).default;
        //     cleanupCallback();
        // });
        // try {
        //   fs.writeFileSync('sync.svelte', words );
        //   // component = require('../../sync.svelte');
        // } catch(err) {
        //   // An error occurred
        //   console.error(err);
        // }
 
        // fs.writeFile('sync.svelte', words, function (err) {
        //   if (err) throw err;
          
        //   console.log('File is created successfully.');
        // }); 

        // fs.writeFileSync(path:)
        
        // 
       
        
        // dir.rmdir();


          // tmp.file(function (err, path, fd , callback ){
          //     if (err) throw err;

              // fs.appendFile(path, new Buffer("random buffer"));
              // fs.appendFile(path, words);
              
          
 
            //   const full = component.render({
            //    answer: 42
            //  });
            
            //    console.log("Html = ",full);
            //    console.log("CSS",css);
            //    var unified = require('unified')
            //    var parse = require('rehype-parse')
            //   var cas = " <style> " + css.code + "</style>";
            //   console.log("CSS NEW",cas);
            //  var complete = html + cas; 
            //   //  parse.apply()
            //   var tree = unified()
            //    .use(parse)
            //    .parse(complete)
             
    
            //    var tree2 = unified()
            //    .use(parse)
            //    .parse(css)
 
            //    console.log("Tree HTML",tree);
            //    console.log("Tree CSS",tree2);
            //   // When the string is empty, split returns an array containing one empty string
            //   if (words != '') {
            //       // create a div containing multiple labels
            //       // const newNodeData = h('div.keyword-container', 
            //       //     // words.map( word => {
            //       //       h('label.keyword', html  )
            //       //     // })
            //       // );
            //       // console.log("---new node", newNodeData);
                  // Object.assign(node, blabla.ast.html);
                  
            //       console.log("---new node after assign", node);
            //   }
          // });
          
//=> 1    

          // component = require("../../zello.svelte").default;
            //  console.log("hahah", `../../${filename}` )
             // const App = require("../../hello.svelte").default;
   
           
          //   console.log('Hello World is helloworld.txt');
          //   // const component = require(`./${filename}`).default;
            
          //   // component = require(`../../${filename}`).default;

          //   // const { head, html, css } = App.render({
          //   //   answer: 42
          //   // });
          // });
        
        }
      }
    }
  }



