// Helper methods that deal with character escaping.
class EscapingHelpersClass {
  sanitizeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/javascript:/g, '');
  }

  restoreSanitizedBrs(text) {
    return text
      .replace(/&lt;br\/&gt;/g, '<br>')
      .replace(/&lt;br \/&gt;/g, '<br>')
      .replace(/&lt;br&gt;/g, '<br>')
      .replace(/&lt;br &gt;/g, '<br>');
  }

  sanitizeParam(param) {
    return String(param)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\//g, '&sol;');
  }

  escapeKeyForRegexp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  processTextAndLinks(text, links, uniqueID) {
    let sanitizedText = this.restoreSanitizedBrs(this.sanitizeHtml(text));
    let initialValue = { sanitizedText, links: [] };

    if (!links) {
      return initialValue;
    }

    return Object.entries(links).reduce((acc, [key, content]) => {
      const elemId = `_luigi_alert_${uniqueID}_link_${this.sanitizeParam(key)}`;
      const escapedText = this.restoreSanitizedBrs(
        this.sanitizeHtml(content.text)
      );
      const processedData = `<a id="${elemId}">${escapedText}</a>`;
      const keyForRegex = this.escapeKeyForRegexp(key);
      const pattern = new RegExp(`({${keyForRegex}})`, 'g');
      return {
        sanitizedText: acc.sanitizedText.replace(pattern, processedData),
        links: acc.links.concat({
          elemId,
          url: encodeURI(this.sanitizeHtml(content.url))
        })
      };
    }, initialValue);
  }
}

export const EscapingHelpers = new EscapingHelpersClass();
