
/**
 * Handlebars block helper that renders the content inside of it based on the current page.
 * @param {string...} pages - One or more pages to check.
 * @param (object) options - Handlebars object.
 * @example
 * {{#ifpagestartswith 'overview' '2020'}}This must be the index or about page.{{/ifpagestartswith}}
 * @return The content inside the helper if a page matches, or an empty string if not.
 */
module.exports = function() {
  var params = Array.prototype.slice.call(arguments);
  var pages = params.slice(0, -1);
  var options = params[params.length - 1];
  var pageName = options.data.root.page;
  for (var i in pages) {
    if (pageName.startsWith(pages[i])) {
      return options.fn(this);
    }
  }

  return '';
}
