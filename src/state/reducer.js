import * as TYPES from './actionTypes';

const reducer = (state, action) => {
  // TODO: change to switch
  if (action.type === TYPES.CHANGE_SONG) {
    return {
      ...state,
      url: action.url,
      title: action.title,
      podcast: action.podcast,
    };
  }
  if (action.type === TYPES.PLAY_SONG) {
    return {
      ...state,
      url: action.url,
      isPlaying: action.url === state.url ? !state.isPlaying : true,
      title: action.title,
      podcast: action.podcast,
    };
  }
  if (action.type === TYPES.TOGGLE_PLAY) {
    return {
      ...state,
      isPlaying: !state.isPlaying,
    };
  }
  return state;
};

export default reducer;
