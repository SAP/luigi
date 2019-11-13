import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import format from 'rehype-format';
import html from 'rehype-stringify';
import addIdsToHeadings from 'rehype-slug';

import luigiLinkParser from '../unified-plugins/rehype-luigi-linkparser';
import addCopyToClipboard from '../unified-plugins/rehype-copy-to-clipboard';
import addCustomAttributes from '../unified-plugins/rehype-add-custom-attributes';

// import highlight from 'rehype-highlight' // syntax highlight code blocks with lowlight: https://github.com/wooorm/lowlight
import rehypeSection from '@agentofuser/rehype-section';
const section = rehypeSection.default;

class MarkdownService {
  async process(value, data = {}) {
    return new Promise((resolve, reject) => {
      unified()
        .use(markdown)
        .use(remark2rehype, {allowDangerousHTML: true})
        .use(raw)
        .use(addCustomAttributes)
        .use(luigiLinkParser, data)
        .use(section)
        // .use(highlight)
        .use(addIdsToHeadings)
        .use(addCopyToClipboard)
        .use(format)
        .use(html)
        .process(String(value), function (err, file) {
          if(err) {
            console.error(err || file)
            return reject();
          }
          resolve(file.contents);
        });
    });
  }
}

export const MarkdownSvc = new MarkdownService();