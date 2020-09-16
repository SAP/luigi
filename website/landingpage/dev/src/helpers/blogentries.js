import { getBlogEntries } from '../services/blogprocessor';
import path from 'path';
import { writeFileSync } from 'fs';

module.exports = () => {
  const blogChunkPath = path.join(__dirname, '../../../public/blog', 'blog-chunks');

  const numberOfBlogsToBeVisibleOnLoad = 5,
  blogsMapAll = getBlogEntries().map(entry => entry.blogExcerpt),
  blogsListLength = blogsMapAll.length,
  showedBlogs = blogsMapAll.slice(0, numberOfBlogsToBeVisibleOnLoad),
  showedBlogsHTML = showedBlogs.join(' '),
  hiddenBlogsArray = blogsMapAll.slice(numberOfBlogsToBeVisibleOnLoad),
  hiddenBlogsArrayLength = hiddenBlogsArray.length;

  const blogHTMLDataLength = `<div id="blog-chunks-data" 
  data-chunk-step="${numberOfBlogsToBeVisibleOnLoad}" 
  data-chunk-total="${blogsListLength}"></div>`

  if (blogsListLength > numberOfBlogsToBeVisibleOnLoad){
    for (var currentBlogNumber=0 ; currentBlogNumber < hiddenBlogsArrayLength; currentBlogNumber += numberOfBlogsToBeVisibleOnLoad) {
      let currentChunkOfBlogs = hiddenBlogsArray.slice(currentBlogNumber, currentBlogNumber + numberOfBlogsToBeVisibleOnLoad);
      let currentChunkOfBlogsHTML = currentChunkOfBlogs.join(' ');
      writeFileSync(blogChunkPath + `/blog-chunk` + currentBlogNumber + `.html`, currentChunkOfBlogsHTML);
    }

    return `${showedBlogsHTML} ${blogHTMLDataLength}`;

  } else if(hiddenBlogsArrayLength === 0){
    return `${showedBlogsHTML}`;
  } 
}