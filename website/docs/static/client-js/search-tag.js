// import * as LuigiClient from '../luigi-client/luigi-client.js';

export class SearchTagHandler {
  init(LuigiClient) {
    if (typeof window !== 'undefined' && typeof self !== 'undefined') {
      window.searchTag = (evt, keyword) => {
        LuigiClient.sendCustomMessage({ id: 'search.tag.keyword', keyword: keyword });
      };
    }
  }
}
