export const listingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_CONFIRMING_DELETE':
      return {
        ...state,
        isConfirmingDelete: action.isConfirmingDelete,
        modalName: action.modalName,
        modalLocation: action.modalLocation,
      };
    case 'SET_IS_DELETING':
      return {
        ...state,
        deleteComplete: action.deleteComplete,
        isDeleting: action.isDeleting,
      };
    case 'SET_DELETE_COMPLETE':
      return {
        ...state,
        deleteComplete: action.deleteComplete,
      };
    case 'SET_IS_EDITING':
      return {
        ...state,
        isEditing: action.isEditing,
      };
    default:
      return state;
  }
};
