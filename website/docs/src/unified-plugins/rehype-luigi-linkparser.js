import has from 'hast-util-has-property';
import url from 'url';
import visit from 'unist-util-visit';
import { writeFileSync, appendFileSync } from 'fs';
import { prependForExport } from './plugin-helpers';

let log = () => {}
if (process.env.NODE_ENV === 'debug') {
  const debugFile =  __dirname + '/debug.log';
  writeFileSync(debugFile, '');
  log = (text = '') => {
    appendFileSync(debugFile, text);
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
      if (
        parsed.href.startsWith(githubMaster + 'docs') && parsed.pathname && parsed.pathname.endsWith('.md') ||
        parsed.pathname && parsed.pathname.endsWith('.md') && !parsed.protocol
      ) {
        // internal link
        // sample links: https://..., file.md, should not start with /file.md or ../file.md
        node.properties['onclick'] = 'navigateInternal(event, this)';
        node.properties['data-linktype'] = 'internal';

        let newHref = parsed.href.replace(githubMaster + 'docs/', '').replace('.md', '');

        // clean ./ from beginning of the link
        if(newHref.startsWith('./')) {
          newHref = newHref.substr(2);
        }

        node.properties['href'] = prependForExport() + '/docs/' + newHref;
      } else if (parsed.protocol && !parsed.pathname.endsWith('.md')) {
        // external link
        node.properties['rel'] = 'external';
        node.properties['target'] = '_blank';
      } else if (parsed.hash && !parsed.pathname && !parsed.hostname) {
        // current page anchor link
        node.properties['href'] = prependForExport() + '/docs/' + settings.shortName + parsed.hash.toLowerCase();
        node.properties['onclick'] = 'navigateInternal(event, this)';
      } else if (parsed.pathname && !parsed.protocol && (
        parsed.pathname.startsWith('../') || parsed.pathname.startsWith('/')
      )) {
        // internal absolute link, probably to some raw file
        let newHref = parsed.href;
        // remove .. if its leading
        if(newHref.startsWith('../')) {
          newHref = newHref.substr(2);
        }
        // remove leading slash
        newHref = newHref.substr(1);

        node.properties['href'] = githubMaster + newHref;
        node.properties['rel'] = 'external';
        node.properties['target'] = '_blank';
      } else {
        console.log('========= UNMATCHED HREF FOUND ============');
        console.log('href', parsed.href);
        console.log(parsed);
        console.log('========= Warning saved to debug.log ============');
        log(parsed.href + ' on ' + JSON.stringify(node) + '\n');
        node.properties['href'] = 'javascript:void(0)';
      }
      // node.properties[prop] = fn(parsed)
      // add logic here
    }
  }
}
