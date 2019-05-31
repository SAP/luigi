// Helper methods that deal with character escaping.

export const sanitizeHtml = text => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/javascript:/g, '')
    .replace(/&lt;br&gt;/g, '<br>');
};

export const sanitizeParam = param => {
  return String(param)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&sol;');
};

export const escapeRegExp = str => {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

export const processTextAndLinks = (text, links, uniqueID) => {
  let sanitizedText = sanitizeHtml(text);
  let initialValue = { sanitizedText, links: [] };

  if (!links) {
    return initialValue;
  }

  return Object.entries(links).reduce((acc, [key, content]) => {
    const elemId = `_luigi_alert_${uniqueID}_link_${sanitizeParam(key)}`;
    const escapedText = sanitizeHtml(content.text);
    const processedData = `<a id="${elemId}">${escapedText}</a>`;
    const keyForRegex = escapeRegExp(key);
    const pattern = new RegExp(`({${keyForRegex}})`, 'g');
    return {
      sanitizedText: acc.sanitizedText.replace(pattern, processedData),
      links: acc.links.concat({
        elemId,
        url: encodeURI(sanitizeHtml(content.url))
      })
    };
  }, initialValue);
};
