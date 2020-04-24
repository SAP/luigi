class GlobalSearch {
  enabled = true;
  search = {
    customSearch: e => {
      return new Promise((resolve, reject) => {
        if (e.keyCode === 13) {
          return resolve(['search something crazy', 'more crazy stuff']);
        }
      });
    }
  };
}
export const globalSearch = new GlobalSearch();
