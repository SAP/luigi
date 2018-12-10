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
     * For hash routing, set to true and run `npm run start`
     * For path routing, set to false and run `npm run start`
     */
    useHashRouting: true
  }
});
