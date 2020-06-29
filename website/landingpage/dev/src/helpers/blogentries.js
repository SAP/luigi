import { getBlogEntries } from '../services/blogprocessor';
module.exports = (options) => {
  return getBlogEntries().map(entry => entry.blogExcerpt).join(' ');
}