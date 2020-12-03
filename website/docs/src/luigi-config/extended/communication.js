class Communication {
  customMessagesListeners = {
    'search.tag.keyword': (customMessage, mfObject, mfNodeObj) => {
      Luigi.globalSearch().openSearchField();
      Luigi.globalSearch().setSearchString(customMessage.keyword);
    }
  }
}

export const communication = new Communication();
