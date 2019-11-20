
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
          viewUrl: '/projects/' + project.id,
          context: {
            currentProject: project.id
          },
          icon: 'folder-blank',
          clientPermissions: {
            changeCurrentLocale: true
          }
        });
      });
      resolve(children);
    });
  });
