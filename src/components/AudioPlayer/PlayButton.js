import React from 'react';

const BLUE = '#3FB3D2';
const BLUE_DARK = '#1A83A1';
const MARGIN_WIDTH = 20;
const PLAY_BUTTON_WIDTH = 100;
const PLAY_BUTTON_BORDER_WIDTH = 5;

const PlayIcon = () =>
  <svg width="40" height="40" viewBox="-5 0 25 20">
    <polygon points="0,0 0,20 20,10" fill="white" />
  </svg>

const PauseIcon = () =>
  <svg width="40" height="40" viewBox="-5 0 25 20">
    <path d="M0,0 L0,20 L5,20 L5,0 L0,0 M10,0 L10,20 L15,20 L15,0, L10,0" fill="white" />
  </svg>

const styles = {
  PreactAudioPlayer__Play: {
    display: 'flex',
    flex: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: PLAY_BUTTON_WIDTH,
    height: PLAY_BUTTON_WIDTH,
    marginLeft: MARGIN_WIDTH,
    backgroundColor: BLUE,
    borderRadius: '50%',
    border: `${PLAY_BUTTON_BORDER_WIDTH}px solid ${BLUE_DARK}`,
    cursor: 'pointer',
  },
};

const PlayButton = ({ isPlaying, onClick }) => (
  <button type="button" title="Play/Pause" aria-label="Play/Pause" style={styles.PreactAudioPlayer__Play} onClick={onClick}>
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
  </button>
);

export default PlayButton;
