import React from 'react';
import styled from 'react-emotion';

const BLUE = '#3FB3D2';
const BLUE_2 = '#00A0AD';
const WHITE = '#FFFFFF';

const Input = styled.input`
  -webkit-appearance: none;
  background: none;
  display: block;
  position: relative;
  outline: none;
  padding: 0;
  margin: 0;
  width: 100%;

  -webkit-appearance: none;
  width: 100%;
  margin: 8px 0;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #48c4ff;
    border-radius: 0px;
    border: 0px solid #010101;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid rgba(0, 0, 0, 0);
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: ${WHITE};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #62ccff;
  }
  &::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #48c4ff;
    border-radius: 0px;
    border: 0px solid #010101;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid rgba(0, 0, 0, 0);
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: ${WHITE};
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #2ebcff;
    border: 0px solid #010101;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  &::-ms-fill-upper {
    background: #48c4ff;
    border: 0px solid #010101;
    border-radius: 0px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  &::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid rgba(0, 0, 0, 0);
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background: ${WHITE};
    cursor: pointer;
    height: 4px;
  }
  &:focus::-ms-fill-lower {
    background: #48c4ff;
  }
  &:focus::-ms-fill-upper {
    background: #62ccff;
  }
`;

class Slider extends React.Component {
  render() {
    const {value, duration, onChange} = this.props;

    const styles = {
      Slider__Slider: {
        width: '100%',
        position: 'relative',
      },
    };

    return (
      <div style={styles.Slider__Slider}>
        <Input
          type="range"
          value={this.props.value || 0}
          min="0"
          max={duration}
          onChange={e => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default Slider;
