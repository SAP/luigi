export const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const navigationPermissionChecker = function(
  nodeToCheckPermissionFor,
  parentNode,
  currentContext
) {
  // depending on the current path and context returns true or false
  // true means the current node is accessible, false the opposite
  var mockCurrentUserGroups = ['admins'];
  if (nodeToCheckPermissionFor.constraints) {
    // check if user has required groups
    return (
      nodeToCheckPermissionFor.constraints.filter(function(c) {
        return mockCurrentUserGroups.indexOf(c) !== -1;
      }).length !== 0
    );
  }

  return true;
};
