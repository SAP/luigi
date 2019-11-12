import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import doc from 'rehype-document';
import format from 'rehype-format';
import html from 'rehype-stringify';
import slug from 'rehype-slug';

import luigiLinkParser from '../unified-plugins/rehype-luigi-linkparser';

// import highlight from 'rehype-highlight' // syntax highlight code blocks with lowlight: https://github.com/wooorm/lowlight
import rehypeSection from '@agentofuser/rehype-section';
const section = rehypeSection.default;

class MarkdownService {
  async process(value, data = {}) {
    return new Promise((resolve) => {
      unified()
        .use(markdown)
        .use(remark2rehype)
        .use(luigiLinkParser, data)
        .use(section)
        // .use(highlight)
        .use(format)
        // .use(doc, { title: data.shortName })
        .use(html)
        .process(String(value), function (err, file) {
          // console.error(report(err || file))
          resolve(file.contents);
        });
    });
  }
}

export const MarkdownSvc = new MarkdownService();