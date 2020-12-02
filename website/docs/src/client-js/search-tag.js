import LuigiClient from '@luigi-project/client';

export class SearchTagHandler {
  init() {
    window.searchTag = (evt, keyword) => {
      LuigiClient.sendCustomMessage({id: 'search.tag.keyword', keyword: keyword})
    }
  }
}
