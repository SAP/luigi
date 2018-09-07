import {luigi} from "@kyma-project/luigi-core";
import '@kyma-project/luigi-core/public/luigi.css'

const getAllProjects = () => {
  return new Promise(resolve => {
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

const getProjectPlugins = projectId => {
  return new Promise(resolve => {
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

const projectDetailNavProviderFn = context => {
  return new Promise(resolve => {
    var projectId = context.currentProject;
    var children = [
      {
        category: 'Usermanagement',
        pathSegment: 'users',
        label: 'Users and Groups',
        viewUrl: '/temp.html#/projects/' + projectId + '/users',
        children: [
          {
            category: 'Groups',
            pathSegment: 'groups',
            label: 'Groups',
            viewUrl: '/temp.html#/projects/' + projectId + '/users/groups',
            children: [
              {
                pathSegment: 'stakeholders',
                label: 'Stakeholders',
                viewUrl: '/temp.html'
              },
              {
                pathSegment: 'customers',
                label: 'Customers',
                viewUrl: '/temp.html'
              }
            ]
          },
          {
            pathSegment: 'usersoverview',
            label: 'Users Overview',
            viewUrl:
            '/temp.html#/projects/' + projectId + '/users/usersoverview'
          }
        ]
      },
      {
        category: 'Usermanagement',
        pathSegment: 'developers',
        label: 'Developers',
        viewUrl: '/temp.html'
      },
      {
        category: 'Settings',
        pathSegment: 'settings',
        label: 'Project Settings',
        viewUrl: '/temp.html'
      },
      {
        pathSegment: 'miscellaneous',
        label: 'Miscellaneous',
        viewUrl: '/temp.html'
      },
      {
        pathSegment: 'miscellaneous2',
        label: 'Miscellaneous2',
        viewUrl: '/temp.html'
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

const projectsNavProviderFn = context => {
  return new Promise(resolve => {
    getAllProjects().then(result => {
      var children = [];
      result.forEach(project => {
        children.push({
          /**
           * navigationContext:
           * Use it for dynamic nodes in order to navigate
           * within a specific context (project in this case)
           * Besides navigate and navigateRelative,
           * LuigiClient provides fromClosestContext().navigate(path)
           * and fromContext(navigationContext).navigate(path) functions
           * which can be used to go upwards multiple context levels
           * eg. /home/:environment/projects/:project/ to go to /home/:environment/settings
           */
          navigationContext: 'project',
          pathSegment: project.id,
          label: project.name,
          viewUrl: '/temp.html',
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


luigi.setConfig({
  // navigation structure and settings
  navigation: {
    nodes: [
      {
        pathSegment: '',
        label: 'Overview',
        viewUrl: '/temp.html?aaahii=aahaaa'
      },
      {
        pathSegment: 'projects',
        label: 'Projects',
        viewUrl: '/temp.html',
        children: projectsNavProviderFn
      },
      {
        hideFromNav: true,
        pathSegment: 'hiddenSample',
        label: 'Hidden',
        viewUrl: '/temp.html',
        children: projectsNavProviderFn
      }
    ]
  },
  routing: {
    // uses hash based navigation if set to true
    useHashRouting: true,
    nodeParamPrefix: '~'
  },
  settings: {
    // hides the navigation completely if set to true
    // hideNavigation: true
    // backdropDisabled: true
  }
})

