import { getBlogEntries } from '../services/blogprocessor';
import path from 'path';
import { writeFileSync } from 'fs';
import { isTypedArray, iteratee } from 'lodash';

module.exports = (options) => {
  const numberOfBlogsToBeVisibleOnLoad = 2;
  const blogsMapAll = getBlogEntries().map(entry => entry.blogExcerpt);
  const blogsListLength = blogsMapAll.length;
  const showedBlogs = blogsMapAll.slice(0, numberOfBlogsToBeVisibleOnLoad);
  const showedBlogsHTML = showedBlogs.join(' ');
  const hiddenBlogsArray = blogsMapAll.slice(numberOfBlogsToBeVisibleOnLoad);
  let hiddenBlogsArrayLength = hiddenBlogsArray.length;
  const hiddenBlogsHTML = hiddenBlogsArray.join(' ');
  const blogChunkPath = path.join(__dirname, '../../../public/blog', 'blog-chunks');


  
  if (blogsListLength > numberOfBlogsToBeVisibleOnLoad){
    for (var currentBlogNumber=0 ; currentBlogNumber < hiddenBlogsArrayLength; currentBlogNumber += numberOfBlogsToBeVisibleOnLoad) {
      var currentChunkOfBlogs = hiddenBlogsArray.slice(currentBlogNumber, currentBlogNumber + numberOfBlogsToBeVisibleOnLoad);
      var currentChunkOfBlogsHTML = currentChunkOfBlogs.join(' ');
      writeFileSync(blogChunkPath + `/blog-chunk` + currentBlogNumber + `.html`, currentChunkOfBlogsHTML);
      /*hiddenBlogsArrayLength = hiddenBlogsArrayLength - numberOfBlogsToBeVisibleOnLoad;*/
    }

    return `${showedBlogsHTML}`;

  } else if(hiddenBlogsArrayLength = 0  ){
    return `${showedBlogsHTML}`;
  } 
  
}