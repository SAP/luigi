describe('Helpers()', () => {
  describe('#containsAllSegments()', () => {
    it('should return true ', async () => {
      const sourceUrl = '#/mas/ko/pa/tol';
      const targetPathSegments = [
        {
          //doesn't matter, it's omitted anyway
        },
        {
          pathSegment: 'mas'
        },
        {
          pathSegment: 'ko'
        },
        {
          pathSegment: 'pa'
        },
        {
          pathSegment: 'tol'
        }
      ];
    });
  });
});
