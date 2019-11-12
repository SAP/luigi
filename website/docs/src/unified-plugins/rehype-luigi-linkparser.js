import has from 'hast-util-has-property';
import url from 'url';
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

export default function luigiLinkParser(options) {
  var settings = options || {};

  return function transformer(tree) {
    visit(tree, 'element', function (node) {
      modify(node, 'href');
    });
  }

  function modify(node, prop) {
    const githubMaster = 'https://github.com/SAP/luigi/blob/master/';
    if (has(node, prop)) {
      var parsed = url.parse(node.properties[prop]);
      // console.log(prop, 'parsed', parsed);
      if (
        parsed.href.startsWith(githubMaster + 'docs') && parsed.pathname && parsed.pathname.endsWith('.md') ||
        parsed.pathname && parsed.pathname.endsWith('.md') 
      ) {
        // internal link
        console.log('href internal docs link', parsed.href);
        // sample links: https://..., file.md, should not contain  /file.md or ../file.md
        // node.properties['on:click|preventDefault|stopPropagation'] = '{handleInternal}';
        node.properties['onclick'] = 'navigateInternal(event, this)';
        const newHref = '/docs/' + parsed.href.replace(githubMaster + 'docs/', '').replace('.md', '');
        node.properties['href'] = newHref;
      } else if (parsed.protocol) {
        // external link
        console.log('href external', parsed.href);
        node.properties['rel'] = 'external';
        node.properties['target'] = '_blank';
      } else if (parsed.hash && !parsed.pathname && !parsed.hostname) {
        // current page anchor link
        console.log('href anchor current page', parsed.href);
        node.properties['rel'] = 'external';
        // node.properties['onclick'] = 'navigateCurrentAnchor(event, this)';
        node.properties['href'] = '/docs/' + settings.shortName + '/' + parsed.hash;
        
      } else if (parsed.pathname && (
        parsed.pathname.startsWith('../') || parsed.pathname.startsWith('/')
      )) {
        // internal absolute link, probably to some raw file
        console.log('href internal absolute link, probably to some raw file', parsed.href);
        node.properties['rel'] = 'external';
        node.properties['target'] = '_blank';
      } else {
        console.log('========= UNMATCHED HREF ============');
        console.log('href', parsed.href);
        console.log(parsed);
        console.log('========= check debug.log ============');
        log(parsed.href + ' on ' + JSON.stringify(node) + '\n');
      }
      // node.properties[prop] = fn(parsed)
      // add logic here
    }
  }
}