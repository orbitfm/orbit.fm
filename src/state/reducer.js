import * as TYPES from './actionTypes'

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.UPDATE_TIME:
      return {
        ...state,
        time: action.time,
      }
    case TYPES.CHANGE_SONG:
      return {
        ...state,
        url: action.url,
        title: action.title,
        podcast: action.podcast,
      }
    case TYPES.PLAY_SONG:
      return {
        ...state,
        url: action.url,
        isPlaying: action.url === state.url ? !state.isPlaying : true,
        title: action.title,
        podcast: action.podcast,
      }
    case TYPES.PLAY_SONG_TIME:
      return {
        ...state,
        url: action.url,
        isPlaying: true,
        title: action.title,
        podcast: action.podcast,
        time: action.time,
      }
    case TYPES.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case TYPES.PAUSE_PLAY:
      return {
        ...state,
        isPlaying: false,
      }
    default:
      return state
  }
}

export default reducer
