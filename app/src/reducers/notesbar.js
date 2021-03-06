import AppConstants from '../AppConstants';

export default (state = {}, payload) => {
  switch (payload.type) {
    case AppConstants.APP_SET_SELECTED_NOTE: {
      return {
        ...state,
        selectedNote: payload.id
      };
    }

    case AppConstants.APP_LOAD_NOTES: {
      return {
        ...state,
        notes: payload.notes
      };
    }

    case AppConstants.APP_UPDATE_NOTE_TITLE: {
      const newState = { ...state };
      for (let i = 0; i < newState.notes.length; i++) {
        if (newState.notes[i].id == payload.id) {
          newState.notes[i].name = payload.name;
          break;
        }
      }
      return newState;
    }

    case AppConstants.APP_CREATE_NEW_NOTE: {
      return {
        ...state,
        selectedNote: payload.note.id,
        notes: [...state.notes, payload.note]
      };
    }

    case AppConstants.APP_SEARCH_NOTES: {
      return {
        ...state,
        searchQuery: payload.query
      };
    }

    case AppConstants.APP_DELETE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== payload.id),
        selectedNote: -1
      };
    }

    case AppConstants.APP_SET_SORTING: {
      return {
        ...state,
        sortMethod: payload.sortMethod,
        sortAscending: payload.sortAscending
      };
    }

    default: {
      return state;
    }
  }
};
