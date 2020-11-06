class Communication {

  customMessagesListeners = {
    'search.tag.keyword': (customMessage, mfObject, mfNodeObj) => {
      console.debug(
        `Core has received custom message: ${JSON.stringify(
          customMessage
        )}
        from microfrontend ${JSON.stringify(mfObject)}.
        Node information: ${JSON.stringify(mfNodeObj)}`
      );

      doKeywordSearch(customMessage.keyword)
    }
  }

}

function doKeywordSearch(keyword){
  Luigi.globalSearch().openSearchField();
  Luigi.globalSearch().setSearchString(keyword);
}

export const communication = new Communication();
