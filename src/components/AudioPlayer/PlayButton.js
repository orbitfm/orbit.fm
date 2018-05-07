import React from 'react';
import styled from 'react-emotion';

const BLUE = '#3FB3D2';
const BLUE_DARK = '#1A83A1';
const MARGIN_WIDTH = 20;
const PLAY_BUTTON_HEIGHT = 100;
const PLAY_BUTTON_BORDER_WIDTH = 5;

const PlayIcon = ({height}) => (
  <svg width={height} height={height} viewBox="-5 0 25 20">
    <polygon points="0,0 0,20 20,10" fill="white" />
  </svg>
);

const PauseIcon = ({height}) => (
  <svg width={height} height={height} viewBox="-5 0 25 20">
    <path
      d="M0,0 L0,20 L5,20 L5,0 L0,0 M10,0 L10,20 L15,20 L15,0, L10,0"
      fill="white"
    />
  </svg>
);

const Button = styled.button`
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${({height}) => `${height}px`};
  height: ${({height}) => `${height}px`};
  background-color: ${BLUE};
  border-radius: 50%;
  border: ${PLAY_BUTTON_BORDER_WIDTH}px solid ${BLUE_DARK};
  cursor: pointer;
`;

const PlayButton = ({isPlaying, onClick, height = PLAY_BUTTON_HEIGHT}) => (
  <Button
    type="button"
    title="Play/Pause"
    aria-label="Play/Pause"
    onClick={onClick}
    height={height}
  >
    {isPlaying ? (
      <PauseIcon height={height * 0.4} />
    ) : (
      <PlayIcon height={height * 0.4} />
    )}
  </Button>
);

export default PlayButton;
