import { projectDetailNavStructure } from './projectDetailNav';
import { projectDetailTabNavStructure } from './projectDetailTabNav';
const getProjectPlugins = projectId =>
  new Promise(resolve => {
    if (projectId === 'pr2') {
      resolve([
        {
          category: 'External Views',
          viewId: 'viewX',
          label: 'This is X',
          viewUrl: 'https://this.is.x/index.html'
        },
        {
          category: 'External Views',
          viewId: 'viewY',
          label: 'This is Y',
          viewUrl: 'https://this.is.y/index.html'
        }
      ]);
    } else {
      resolve([
        {
          category: 'External Views',
          viewId: 'abc',
          label: 'A B C',
          viewUrl: 'https://a.b.c/index.html'
        },
        {
          category: 'External Views',
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

let allProjects = [
  {
    id: 'pr1',
    name: 'Project One'
  },
  {
    id: 'pr2',
    name: 'Project Two'
  },
  {
    id: 'tabNav',
    name: 'Horizontal Navigation Example'
  },
  {
    id: 'storage',
    name: 'storage'
  }
];

export const addProject = newProject => {
  allProjects.push(
    newProject || {
      id: 'pr' + (allProjects.length + 1),
      name: 'Project ' + (allProjects.length + 1)
    }
  );
  return allProjects[allProjects.length - 1];
};

export const removeProject = () => {
  return allProjects.pop();
};

export const projectExists = projectId => {
  return Boolean(allProjects.find(p => p.id === projectId));
};

export const getProjectCount = () => {
  return allProjects.length;
};

const getAllProjects = () =>
  new Promise(resolve => {
    resolve(allProjects);
  });

export const getAllProjectsSync = () => {
  return allProjects;
};

const projectDetailNavProviderFn = context =>
  new Promise(resolve => {
    const projectId = context.currentProject;
    const children =
      projectId === 'tabNav' ? projectDetailTabNavStructure(projectId) : projectDetailNavStructure(projectId);

    getProjectPlugins(projectId).then(result => {
      result.forEach(plugin => {
        children.push({
          category: plugin.category,
          pathSegment: plugin.viewId,
          label: plugin.label,
          viewUrl: plugin.viewUrl,
          pageErrorHandler: plugin.pageErrorHandler,
          context: plugin.context
        });
      });
      resolve(children);
    });
  });

export const projectsCounterFn = context =>
  new Promise(resolve => {
    getAllProjects().then(function(result) {
      if (result.length) {
        resolve(result.length);
      } else {
        resolve(undefined);
      }
    });
  });

export const projectsNavProviderFn = context =>
  new Promise(resolve => {
    getAllProjects().then(function(result) {
      var children = [];
      result.forEach(function(project) {
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
          viewUrl: '/sampleapp.html#/projects/' + project.id,
          context: {
            currentProject: project.id
          },
          icon: 'folder-blank',
          clientPermissions: {
            changeCurrentLocale: true
          },
          children: projectDetailNavProviderFn,
          tabNav: project.id === 'tabNav' ? true : false
          // hideSideNav: project.id === 'tabNav' ? true : false
        });
      });
      resolve(children);
    });
  });

export const navigationPermissionChecker = (nodeToCheckPermissionFor, parentNode, currentContext) => {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  const mockCurrentUserGroups = ['admins'];
  if (!nodeToCheckPermissionFor.constraints) return true;
  // check if user has required groups
  return nodeToCheckPermissionFor.constraints.some(c => mockCurrentUserGroups.includes(c));
};

let mockBadgeCount = 0;
setInterval(() => {
  mockBadgeCount++;
  // Luigi.navigation().updateTopNavigation(); // update top navigation with each count update
}, 5000);
export const getMockBadgeCount = () => mockBadgeCount;
