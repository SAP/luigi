var getAllProjects = function() {
  return new Promise(function(resolve) {
    resolve([
      {
        id: 'pr1',
        name: 'Project One'
      },
      {
        id: 'pr2',
        name: 'Project Two'
      }
    ]);
  });
};

var getProjectPlugins = function(projectId) {
  return new Promise(function(resolve) {
    if (projectId === 'pr2') {
      resolve([
        {
          category: 'ExternalViews',
          viewId: 'viewX',
          label: 'This is X',
          viewUrl: 'https://this.is.x/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'viewY',
          label: 'This is Y',
          viewUrl: 'https://this.is.y/index.html'
        }
      ]);
    } else {
      resolve([
        {
          category: 'ExternalViews',
          viewId: 'abc',
          label: 'A B C',
          viewUrl: 'https://a.b.c/index.html'
        },
        {
          category: 'ExternalViews',
          viewId: 'def',
          label: 'D E F',
          viewUrl: 'https://d.e.f/index.html',
          context: {
            aaaaa: 'hiiiiii'
          }
        }
      ]);
    }
  });
};

var projectDetailNavProviderFn = function(context) {
  return new Promise(function(resolve) {
    var projectId = context.currentProject;
    var children = [
      {
        category: 'Usermanagement',
        pathSegment: 'users',
        label: 'Users and Groups',
        viewUrl:
          '/cypress/fixtures/temp.html#/projects/' + projectId + '/users',
        children: [
          {
            category: 'Groups',
            pathSegment: 'groups',
            label: 'Groups',
            viewUrl:
              '/cypress/fixtures/temp.html#/projects/' +
              projectId +
              '/users/groups',
            children: [
              {
                pathSegment: 'stakeholders',
                label: 'Stakeholders',
                viewUrl: '/cypress/fixtures/temp.html'
              },
              {
                pathSegment: 'customers',
                label: 'Customers',
                viewUrl: '/cypress/fixtures/temp.html'
              }
            ]
          },
          {
            pathSegment: 'usersoverview',
            label: 'Users Overview',
            viewUrl:
              '/cypress/fixtures/temp.html#/projects/' +
              projectId +
              '/users/usersoverview'
          }
        ]
      },
      {
        category: 'Usermanagement',
        pathSegment: 'developers',
        label: 'Developers',
        viewUrl: '/cypress/fixtures/temp.html'
      },
      {
        category: 'Settings',
        pathSegment: 'settings',
        label: 'Project Settings',
        viewUrl: '/cypress/fixtures/temp.html'
      },
      {
        pathSegment: 'miscellaneous',
        label: 'Miscellaneous',
        viewUrl: '/cypress/fixtures/temp.html'
      },
      {
        pathSegment: 'miscellaneous2',
        label: 'Miscellaneous2',
        viewUrl: '/cypress/fixtures/temp.html'
      }
    ];
    getProjectPlugins(projectId).then(result => {
      result.forEach(plugin => {
        children.push({
          category: plugin.category,
          pathSegment: plugin.viewId,
          label: plugin.label,
          viewUrl: plugin.viewUrl,
          context: plugin.context
        });
      });
      resolve(children);
    });
  });
};

var projectsNavProviderFn = function(context) {
  return new Promise(function(resolve) {
    getAllProjects().then(result => {
      var children = [];
      result.forEach(project => {
        children.push({
          pathSegment: project.id,
          label: project.name,
          viewUrl: '/cypress/fixtures/temp.html',
          context: {
            currentProject: project.id
          },
          children: projectDetailNavProviderFn
        });
      });
      resolve(children);
    });
  });
};

window.LuigiConfig = {
  navigation: {
    nodes: () => [
      {
        pathSegment: 'overview',
        label: 'Overview',
        viewUrl: '/cypress/fixtures/temp.html'
      },
      {
        pathSegment: 'projects',
        label: 'Projects',
        viewUrl: '/cypress/fixtures/temp.html',
        children: projectsNavProviderFn
      }
    ]
  }
};

export const LuigiConfig = window.LuigiConfig;
