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

/**
 * Format english date from YYYY-MM-DD
 * @returns string 1. Mar, 2020
 */
const formatDate = (date) => {
  const d = new Date(Date.parse(date));
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

const getAuthors = (authors) => {
  let authorStr;
  if (!authors) {
    return '';
  } else if (authors instanceof Array) {
    return authors.join(' and ');
  } else {
    return authors;
  }
}

const generateBlogEntry = (blog, content, showButton = false) => {
  // console.log(blog, content)
  
  const button = showButton ? `<p><a href="/blog/${blog.slug}" class="btn-primary">Read more</a></p>` : '';
  return `

  <div class="blog-entry">
    <div class="title-2">
      ${blog.title}
    </div>
    <div class="sub-title"><span class="text">${getAuthors(blog.author)} @Luigi on ${formatDate(blog.date)}</span></div>
    ${content}
    ${button}
  </div>
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
        author: mdData.data.author,
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
