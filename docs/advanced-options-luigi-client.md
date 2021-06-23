<!-- meta
{
  "node": {
    "label": "Advanced Options",
    "category": {
      "label": "Luigi Client"
    },
    "metaData": {
      "categoryPosition": 3,
      "position": 3
    }
  }
}
meta -->

# Advanced configuration options

## Disable Luigi Core browser history handling

By default Luigi Client navigation does not manipulate the browser history. Luigi Core handles the browser history by design. If there is a need to disable the history handling by Luigi Core you can add a attribute to the `head`-tag in the `index.html` of theLuigi Client micro frontend, like:

```html
<!DOCTYPE html>
<html>
  <head disable-luigi-history-handling="true"> </head>
  <body></body>
</html>
```
