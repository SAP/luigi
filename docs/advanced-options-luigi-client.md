<!-- meta
{
  "node": {
    "label": "Advanced configuration options",
    "category": {
      "label": "Luigi Client"
    },
    "metaData": {
      "categoryPosition": 4,
      "position": 2
    }
  }
}
meta -->

# Advanced configuration options

## Disable Luigi Core browser history handling

By default, Luigi Client navigation does not manipulate the browser history. Luigi Core handles the browser history by design. If there is a need to disable the history handling by Luigi Core, you can add an attribute to the `head`-tag in the `index.html` of the Luigi Client micro frontend. For example:

```html
<!DOCTYPE html>
<html>
  <head disable-luigi-history-handling="true"> </head>
  <body></body>
</html>
```

## Disable Luigi Core runtime error handling

By default, Luigi Client listen to runtime errors and send the [error event](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent) properties to Luigi Core. 
If a navigation node has configured a property called [onRuntimeErrorHandler](navigation-parameters-reference.md#node-parameters) you have the possibility to handle errors on core level.
```html
<!DOCTYPE html>
<html>
  <head disable-luigi-runtime-error-handling="true"> </head>
  <body></body>
</html>
```

