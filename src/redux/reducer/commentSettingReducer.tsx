type CommentSettingsState = {
    settingStatus: number;
  };
  
  const initialState: CommentSettingsState = {
    settingStatus: 0,
  };
  
  type Action = 
    | { type: 'SET_COMMENT_SETTINGS'; payload: number };
  
  function commentSettingsReducer(
    state = initialState, 
    action: Action
  ): CommentSettingsState {
    switch (action.type) {
      case 'SET_COMMENT_SETTINGS':
        return {
          ...state,
          settingStatus: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default commentSettingsReducer;