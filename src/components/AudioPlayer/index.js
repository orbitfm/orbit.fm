import React from 'react';
import leftPad from 'left-pad';
import Slider from './Slider';
import PlayButton from './PlayButton';

const VOLUME_WIDTH = 100;
const SLIDER_WIDTH = 300;
const BLUE = '#3FB3D2';
const BLUE_DARK = '#1A83A1';
const BLUE_2 = '#00A0AD';
const WHITE = '#FFFFFF';

const getNextRate = currentRate => {
  const rates = [1, 1.25, 1.5, 2];
  const i = rates.indexOf(currentRate);
  return rates[i === rates.length - 1 ? 0 : i + 1];
};

const getMinutesAndSeconds = time => {
  return `${leftPad(Math.floor(time / 60), 2, '0')}:${leftPad(
    time % 60,
    2,
    '0'
  )}`;
};

const MuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100">
    <path
      d="M10.148,33.29v33.42h23.314l21.111,16.446V16.844L33.463,33.29H10.148z M74.477,50c0-8.232-5.002-15.315-12.125-18.379   v36.758C69.475,65.315,74.477,58.232,74.477,50z M62.352,15.52v7.226c11.826,3.423,20.5,14.341,20.5,27.255   s-8.674,23.832-20.5,27.255v7.226c15.727-3.591,27.5-17.682,27.5-34.48S78.078,19.11,62.352,15.52z"
      fill={WHITE}
    />
  </svg>
);

const UnmuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100">
    <path
      d="M10.148,33.29v33.42h23.314l21.111,16.446V16.844L33.463,33.29H10.148z"
      fill={WHITE}
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="40" height="40" viewBox="-5 0 25 20">
    <polygon points="0,0 0,20 20,10" fill="white" />
  </svg>
);

const PauseIcon = () => (
  <svg width="40" height="40" viewBox="-5 0 25 20">
    <path
      d="M0,0 L0,20 L5,20 L5,0 L0,0 M10,0 L10,20 L15,20 L15,0, L10,0"
      fill="white"
    />
  </svg>
);

const MARGIN_WIDTH = 20;
const PLAY_BUTTON_WIDTH = 100;
const RATE_WIDTH = 30;
const MUTE_WIDTH = 20;

class AudioPlayer extends React.Component {
  state = {
    isMuted: false,
    volume: 1,
    currentTime: null,
    duration: null,
    rate: 1,
    window: 0,
  };

  static defaultProps = {
    url: null,
  };

  neverPlayed = true;

  componentDidMount = () => {
    this.audio.src = this.props.url;

    if (this.props.time) {
      this.handleTimeChange(this.props.time);
    }

    this.audio.addEventListener(
      'timeupdate',
      event => {
        this.setState({
          currentTime: Math.floor(this.audio.currentTime),
        });
        if (this.props.reportedTime) {
          this.props.reportedTime(Math.floor(this.audio.currentTime));
        }
      },
      false
    );

    this.audio.addEventListener('canplay', () => {
      if (this.props.isPlaying && this.neverPlayed) {
        this.audio.play();
        this.neverPlayed = false;
      }
      this.setState({
        duration: Math.floor(this.audio.duration),
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.audio.src = this.props.url;
      if (this.props.isPlaying) {
        this.audio.play();
      }
    }
    if (this.props.time !== prevProps.time) {
      this.setState({
        lastReportedTime: this.props,
      });
      if (
        this.props.time !== prevProps.time &&
        this.props.time + 1 !== prevProps.time &&
        this.props.time - 1 !== prevProps.time
      ) {
        this.handleTimeChange(this.props.time);
      }
    }
    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.props.isPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
  };

  handleVolumeChange = volume => {
    this.setState(
      {
        volume,
        isMuted: volume === 0,
      },
      () => {
        this.audio.volume = volume;
      }
    );
  };

  handleTimeChange = currentTime => {
    this.setState({
      currentTime,
    });

    this.audio.currentTime = currentTime;
  };

  handleTimeDrag = percentTime => {
    const dragTime = Math.floor(this.state.duration * percentTime);

    this.setState({
      isDragging: true,
      dragTime,
    });
  };

  handleTimeDragStop = () => {
    this.setState({
      isDragging: false,
    });
  };

  handleMuteClick = () => {
    this.setState(
      {
        isMuted: !this.state.isMuted,
        volume: this.state.volume === 0 ? 0.5 : this.state.volume,
      },
      () => {
        this.audio.volume = this.state.isMuted ? 0 : this.state.volume;
      }
    );
  };

  handlePlaybackRate = () => {
    this.setState(
      {
        rate: getNextRate(this.state.rate),
      },
      () => {
        this.audio.playbackRate = this.state.rate;
      }
    );
  };

  render() {
    const {
      isMuted,
      volume,
      currentTime,
      dragTime,
      isDragging,
      duration,
      rate,
    } = this.state;

    const {isPlaying, onPlayClick, podcast, title} = this.props;

    const styles = {
      AudioPlayer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: PLAY_BUTTON_WIDTH,
        margin: 0,
        backgroundColor: BLUE_DARK,
        fontFamily: 'sans-serif',
      },
      AudioPlayer__Play: {
        marginLeft: MARGIN_WIDTH,
      },
      AudioPlayer__Time_Title: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        marginLeft: MARGIN_WIDTH,
      },
      AudioPlayer__Title: {},
      AudioPlayer__Time: {
        display: 'flex',
        color: WHITE,
      },
      AudioPlayer__TimeLeft: {},
      AudioPlayer__TimeSlider: {
        width: '100%',
      },
      AudioPlayer__Rate: {
        width: RATE_WIDTH,
        marginLeft: MARGIN_WIDTH,
        color: WHITE,
        cursor: 'pointer',
      },
      AudioPlayer__Volume: {
        display: 'flex',
        marginRight: MARGIN_WIDTH,
      },
      AudioPlayer__Mute: {
        width: MUTE_WIDTH,
        marginLeft: MARGIN_WIDTH,
        border: 'none',
        color: WHITE,
        background: 'none',
        cursor: 'pointer',
      },
    };

    return (
      <div style={styles.AudioPlayer} ref={e => (this.component = e)}>
        <audio ref={a => (this.audio = a)} />
        <div style={styles.AudioPlayer__Play}>
          <PlayButton isPlaying={isPlaying} onClick={onPlayClick} />
        </div>
        <div style={styles.AudioPlayer__Time_Title}>
          <div style={styles.AudioPlayer__Title}>
            {podcast} {title}
          </div>
          <div style={styles.AudioPlayer__Time}>
            <div style={styles.AudioPlayer__TimeSlider}>
              <Slider
                value={currentTime || 0}
                duration={duration}
                onChange={this.handleTimeChange}
                onDrag={this.handleTimeDrag}
                onDragStop={this.handleTimeDragStop}
              />
            </div>
          </div>
          <div style={styles.AudioPlayer__TimeLeft}>
            {getMinutesAndSeconds(isDragging ? dragTime : currentTime)} /{' '}
            {getMinutesAndSeconds(duration)}
          </div>
        </div>
        <div style={styles.AudioPlayer__Rate} onClick={this.handlePlaybackRate}>
          {rate}x
        </div>
        <div style={styles.AudioPlayer__Volume}>
          <button
            type="button"
            title="Mute Toggle"
            aria-label="Mute Toggle"
            style={styles.AudioPlayer__Mute}
            onClick={this.handleMuteClick}
          >
            {isMuted ? <UnmuteIcon /> : <MuteIcon />}
          </button>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
