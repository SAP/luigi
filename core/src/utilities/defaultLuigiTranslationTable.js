const defaultLuigiInternalTranslationTable = {
  luigi: {
    unsavedChangesAlert: {
      header: 'Unsaved changes detected',
      body: 'Unsaved changes will be lost. Do you want to continue?'
    },
    confirmationModal: {
      header: 'Confirmation',
      body: 'Are you sure you want to do this?'
    },
    button: {
      dismiss: 'No',
      confirm: 'Yes'
    },
    requestedRouteNotFound: 'Could not find the requested route {route}.',
    notExactTargetNode:
      'Could not map the exact target node for the requested route {route}.'
  }
};

export const defaultLuigiTranslationTable = defaultLuigiInternalTranslationTable;
