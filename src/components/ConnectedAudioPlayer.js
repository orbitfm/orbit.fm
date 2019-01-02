import React from 'react';
import { connect } from 'react-redux';

import AudioPlayer from '../components/AudioPlayer';
import { togglePlay, pausePlay, updateTime } from '../state/actions';
import {
  selectUrl,
  selectPodcast,
  selectTitle,
  selectIsPlaying,
  selectTime,
} from '../state/selectors';

const ConnectedAudioPlayer = connect(
  state => ({
    url: selectUrl(state),
    podcast: selectPodcast(state),
    title: selectTitle(state),
    isPlaying: selectIsPlaying(state),
    time: selectTime(state),
  }),
  {
    onPlayClick: togglePlay,
    reportedTime: updateTime,
    onPause: pausePlay,
  }
)(props => <AudioPlayer {...props} />);

export default ConnectedAudioPlayer;
