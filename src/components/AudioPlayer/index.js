import React from 'react'
import leftPad from 'left-pad'
import Slider from './Slider'
import PlayButton from './PlayButton'

const BLUE_DARK = '#1A83A1'
const WHITE = '#FFFFFF'

const getNextRate = currentRate => {
  const rates = [1, 1.25, 1.5, 2]
  const i = rates.indexOf(currentRate)
  return rates[i === rates.length - 1 ? 0 : i + 1]
}

const getMinutesAndSeconds = time => {
  const hours = leftPad(Math.floor(time / 3600), 2, '0')
  const minutes = leftPad(Math.floor((time / 60) % 60), 2, '0')
  const seconds = leftPad(Math.floor(time % 60), 2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const MuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100">
    <path
      d="M10.148,33.29v33.42h23.314l21.111,16.446V16.844L33.463,33.29H10.148z M74.477,50c0-8.232-5.002-15.315-12.125-18.379   v36.758C69.475,65.315,74.477,58.232,74.477,50z M62.352,15.52v7.226c11.826,3.423,20.5,14.341,20.5,27.255   s-8.674,23.832-20.5,27.255v7.226c15.727-3.591,27.5-17.682,27.5-34.48S78.078,19.11,62.352,15.52z"
      fill={WHITE}
    />
  </svg>
)

const UnmuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100">
    <path
      d="M10.148,33.29v33.42h23.314l21.111,16.446V16.844L33.463,33.29H10.148z"
      fill={WHITE}
    />
  </svg>
)

const MARGIN_WIDTH = 20
const RATE_WIDTH = 45
const MUTE_WIDTH = 20

class AudioPlayer extends React.Component {
  state = {
    isMuted: false,
    volume: 1,
    currentTime: null,
    duration: null,
    rate: 1,
    window: 0,
  }

  static defaultProps = {
    url: null,
  }

  neverPlayed = true

  componentDidMount = () => {
    this.audio.src = this.props.url

    if (this.props.time) {
      this.handleTimeChange(this.props.time)
    }

    this.audio.addEventListener(
      'timeupdate',
      event => {
        this.setState({
          currentTime: Math.floor(this.audio.currentTime),
        })
        if (this.props.reportedTime) {
          this.props.reportedTime(Math.floor(this.audio.currentTime))
        }
      },
      false
    )

    this.audio.addEventListener('canplay', () => {
      if (this.props.isPlaying && this.neverPlayed) {
        this.audio.play()
        this.neverPlayed = false
      }
      this.setState({
        duration: Math.floor(this.audio.duration),
      })
    })

    this.playerHeight = this.component.getBoundingClientRect().height
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.audio.src = this.props.url
      if (this.props.isPlaying) {
        this.audio.play()
      }
    }
    if (this.props.time !== prevProps.time) {
      this.setState({
        lastReportedTime: this.props,
      })
      if (
        this.props.time !== prevProps.time &&
        this.props.time + 1 !== prevProps.time &&
        this.props.time - 1 !== prevProps.time
      ) {
        this.handleTimeChange(this.props.time)
      }
    }
    if (this.props.time === this.state.duration) {
      this.props.onPause()
    }
    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (this.props.isPlaying) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }
  }

  componentWillUnmount = () => {
    if (window.removeEventListener) {
      window.removeEventListener('resize', this.updateDimensions)
    }
  }

  handleVolumeChange = volume => {
    this.setState(
      {
        volume,
        isMuted: volume === 0,
      },
      () => {
        this.audio.volume = volume
      }
    )
  }

  handleTimeChange = currentTime => {
    this.setState({
      currentTime,
    })

    this.audio.currentTime = currentTime
  }

  handleTimeDrag = percentTime => {
    const dragTime = Math.floor(this.state.duration * percentTime)

    this.setState({
      isDragging: true,
      dragTime,
    })
  }

  handleTimeDragStop = () => {
    this.setState({
      isDragging: false,
    })
  }

  handleMuteClick = () => {
    this.setState(
      {
        isMuted: !this.state.isMuted,
        volume: this.state.volume === 0 ? 0.5 : this.state.volume,
      },
      () => {
        this.audio.volume = this.state.isMuted ? 0 : this.state.volume
      }
    )
  }

  handlePlaybackRate = () => {
    this.setState(
      {
        rate: getNextRate(this.state.rate),
      },
      () => {
        this.audio.playbackRate = this.state.rate
      }
    )
  }

  render() {
    const {
      isMuted,
      currentTime,
      dragTime,
      isDragging,
      duration,
      rate,
    } = this.state

    const { isPlaying, onPlayClick, podcast, title } = this.props

    const styles = {
      AudioPlayer: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        backgroundColor: BLUE_DARK,
      },
      AudioPlayer__Body: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
      AudioPlayer__Play: {
        marginLeft: MARGIN_WIDTH,
      },
      AudioPlayer__Title: {
        marginLeft: 110,
      },
      AudioPlayer__Time: {
        marginLeft: 110,
      },
      AudioPlayer__Slider: {
        flex: '1 1 auto',
        marginLeft: 20,
      },
      AudioPlayer__Rate: {
        display: 'flex',
        justifyContent: 'center',
        width: RATE_WIDTH,
        marginLeft: MARGIN_WIDTH,
        color: WHITE,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
      },
      AudioPlayer__Volume: {
        display: 'flex',
        marginRight: MARGIN_WIDTH,
      },
      AudioPlayer__Mute: {
        width: MUTE_WIDTH,
        border: 'none',
        color: WHITE,
        background: 'none',
        cursor: 'pointer',
      },
      AudioPlayer__Spacer: {
        height: this.playerHeight,
        width: '100%',
      },
    }

    return (
      <div>
        <div style={styles.AudioPlayer} ref={e => (this.component = e)}>
          <audio ref={a => (this.audio = a)} />
          <div style={styles.AudioPlayer__Title}>
            {podcast} {title}
          </div>
          <div style={styles.AudioPlayer__Body}>
            <div style={styles.AudioPlayer__Play}>
              <PlayButton
                isPlaying={isPlaying}
                onClick={onPlayClick}
                height={70}
              />
            </div>
            <div style={styles.AudioPlayer__Slider}>
              <Slider
                value={currentTime || 0}
                duration={duration}
                onChange={this.handleTimeChange}
                onDrag={this.handleTimeDrag}
                onDragStop={this.handleTimeDragStop}
              />
            </div>
            <button
              type="button"
              title="Change playback rate"
              aria-label="Change playback rate"
              style={styles.AudioPlayer__Rate}
              onClick={this.handlePlaybackRate}
            >
              {rate}x
            </button>
            <div style={styles.AudioPlayer__Volume}>
              <button
                type="button"
                title="Mute toggle"
                aria-label="Mute toggle"
                style={styles.AudioPlayer__Mute}
                onClick={this.handleMuteClick}
              >
                {isMuted ? <UnmuteIcon /> : <MuteIcon />}
              </button>
            </div>
          </div>
          <div style={styles.AudioPlayer__Time}>
            {getMinutesAndSeconds(isDragging ? dragTime : currentTime)} /{' '}
            {getMinutesAndSeconds(duration)}
          </div>
        </div>
        <div style={styles.AudioPlayer__Spacer} />
      </div>
    )
  }
}

export default AudioPlayer
