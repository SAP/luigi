export function prependForExport() {
  if (process.env.NODE_ENV == 'production') {
    return '/docu-microfrontend';
  } else {
    return '';
  }
}
//# sourceMappingURL=plugin-helpers.js.map
