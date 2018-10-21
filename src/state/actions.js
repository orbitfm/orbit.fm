import * as TYPES from '../state/actionTypes';

export const playSong = ({ url, podcast, title }) => ({
  type: TYPES.PLAY_SONG,
  url,
  podcast,
  title,
});

export const playSongAtTime = ({ url, podcast, title, time }) => ({
  type: TYPES.PLAY_SONG_TIME,
  url,
  podcast,
  title,
  time,
});

export const togglePlay = () => ({ type: TYPES.TOGGLE_PLAY });

export const pausePlay = () => ({ type: TYPES.PAUSE_PLAY });

export const updateTime = time => ({ type: TYPES.UPDATE_TIME, time });
