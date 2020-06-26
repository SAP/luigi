module.exports = function() {
  /**
   * Handlebars block helper that renders the content inside of it based on the current page.
   * @param {string...} pages - One or more pages to check.
   * @param (object) options - Handlebars object.
   * @example
   * {{#ifpage 'index' 'about'}}This must be the index or about page.{{/ifpage}}
   * {{#ifpage 'about*' '*ends' '*ind*ex*'}}This must be the index or about page.{{/ifpage}}
   * 
      {{#ifpagewildcard 'over*view'}}<p>over*view</p>{{/ifpagewildcard}}
      {{#ifpagewildcard 'ove*iew'}}<p>ove*iew</p>{{/ifpagewildcard}}
      {{#ifpagewildcard '*view'}}<p>*view</p>{{/ifpagewildcard}}
      {{#ifpagewildcard 'over*'}}<p>over*</p>{{/ifpagewildcard}}
      {{#ifpagewildcard '*ervie*'}}<p>*ervie*</p>{{/ifpagewildcard}}
      {{#ifpagewildcard '*ervie'}}<p>*ervie NOT SHOWN</p>{{/ifpagewildcard}}
      {{#ifpagewildcard 'vervie*'}}<p>vervie* NOT SHOWN</p>{{/ifpagewildcard}}
   * @return The content inside the helper if a page matches, or an empty string if not.
   */
  const allAsterisks = new RegExp(/\*/, 'g');

  var params = Array.prototype.slice.call(arguments);
  var pages = params.slice(0, -1);
  var options = params[params.length - 1];
  var pageName = options.data.root.page;
  
  for (var i in pages) {
    const tester = new RegExp('^' + pages[i].replace(allAsterisks, '.*') + '$');
    if (tester.test(pageName)) {
      return options.fn(this);
    }
  }

  return '';
}
