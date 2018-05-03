import * as ACTIONS from './actions';

const reducer = (state, action) => {
  // TODO: change to switch
  if (action.type === ACTIONS.CHANGE_SONG) {
    return {
      ...state,
      url: action.url,
      title: action.title,
      podcast: action.podcast,
    };
  }
  if (action.type === ACTIONS.PLAY_SONG) {
    return {
      ...state,
      url: action.url,
      isPlaying: action.url === state.url ? !state.isPlaying : true,
      title: action.title,
      podcast: action.podcast,
    };
  }
  if (action.type === ACTIONS.TOGGLE_PLAY) {
    return {
      ...state,
      isPlaying: !state.isPlaying,
    };
  }
  return state
};

export default reducer;
