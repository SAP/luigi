// ParentNode.prepend() for IE 11
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function(argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// oldURL & newURL properties of hashchange event support for IE 11

(function() {
  if (!window.HashChangeEvent) {
    var lastURL = document.URL;
    window.addEventListener('hashchange', function(e) {
      var oldURL = lastURL;
      var newURL = document.URL;
      lastURL = newURL;
      Object.defineProperties(e, {
        oldURL: { enumerable: true, configurable: true, value: oldURL },
        newURL: { enumerable: true, configurable: true, value: newURL }
      });
    });
  }
})();
