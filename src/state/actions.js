import * as TYPES from '../state/actionTypes';

export const playSong = (url, podcast, title) => ({
  type: TYPES.PLAY_SONG,
  url,
  podcast,
  title,
});

export const togglePlay = () => ({type: TYPES.TOGGLE_PLAY});
