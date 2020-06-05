import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import frontmatter from 'frontmatter';
import marked from 'marked';
import slugify from 'slugify';

const luigiRootFolder = __dirname + '/../../../../../';
const blogMdPath = path.join(luigiRootFolder, 'blog');
const blogHtmlPath = path.join(__dirname, '..', 'pages', 'blog');

const hasValidDate = (dateStr) => {
  // Tests YYYY-MM-DD
  const dateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  return dateRegExp.test(dateStr);
};

const getSlug = (fileName) => {
  return slugify(fileName.slice(0, -3)); // remove .md from the end
}

const generateBlogEntry = (blog, content, showButton = false) => {
  // console.log(blog, content)
  const button = showButton ? `<p><a href="/blog/${blog.slug}" class="btn-primary">Read more</a></p>` : '';
  return `
  <!-- Single Blog entry start -->
  <div class="column small-9 large-6 blog-entry-header">
    <div class="title-2">
      ${blog.title}
    </div>
    <div class="sub-title"><span class="text">${blog.date}</span></div>
  </div>
  <div class="columns xlarge-9 blog-entry-content">
    ${content}
    ${button}
  </div>
  <!-- Single Blog entry end -->
  `
}

export const getBlogEntries = (singleSlug = false) => {
  return readdirSync( blogMdPath )
    .filter(fileName => !singleSlug || singleSlug == getSlug(fileName))
    .filter(fileName => hasValidDate(fileName))
    .map(fileName => {
      const fileContent = readFileSync(path.join(blogMdPath, fileName)).toString();
      const mdData = frontmatter(fileContent.split('<!-- Excerpt -->')[0]);
      const date = fileName.substr(0, 10); // 10 is length of the date
      const slug = getSlug(fileName);

      const entry = {
        slug,
        date,
        title: mdData.data.title,
        fileName,
        description: mdData.data.description,
        htmlExcerpt: marked(mdData.content),
        htmlContent: marked(frontmatter(fileContent).content)
      };
      entry.blogExcerpt = generateBlogEntry(entry, entry.htmlExcerpt, true);
      entry.blogContent = generateBlogEntry(entry, entry.htmlContent);
      return entry;
    });
}

export const writeBlogFiles = () => {
  getBlogEntries().forEach(entry => {
    const blogHtml = `---
title: ${entry.title}
description: ${entry.description}
layout: blog
---
${entry.blogContent}`;
    writeFileSync(blogHtmlPath + `/${entry.slug}.html`, blogHtml);
  });
};
