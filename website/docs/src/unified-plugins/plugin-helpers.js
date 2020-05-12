
  export function prependForExport() {
    if (process.env.NODE_ENV == 'production') {
      return '/docu-microfrontend';
    } else {
      return '';
    }
  }

  export function prependForExportNewTab() {
    if (process.env.NODE_ENV == 'production') {
      return '';
    } else {
      return 'http://localhost:4000';
    }
  }