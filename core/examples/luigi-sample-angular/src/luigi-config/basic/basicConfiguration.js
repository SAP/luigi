//you can now use ES6 goodies here
Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        children: [
          {
            pathSegment: 'hw',
            label: 'Hello World!',
            viewUrl: '/assets/basicexternal.html'
          },
          {
            pathSegment: 'one',
            label: 'Section one',
            viewUrl: '/assets/basicexternal.html#one'
          },
          {
            pathSegment: 'two',
            label: 'Section two',
            viewUrl: '/assets/basicexternal.html#two'
          }
        ]
      }
    ]
  },
  routing: {
    /**
     * Development:
     * For path routing, set to false
     * For hash routing, set to true
     */
    useHashRouting: true
  }
});

const someObj = { one: 1, two: 2 };
const { one: otherObj } = someObj;

const test = (a = 123, b = 321) => {};
