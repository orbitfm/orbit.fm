import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import AudioPlayer from '../components/AudioPlayer';
import {togglePlay, updateTime} from '../state/actions';
import {
  selectUrl,
  selectPodcast,
  selectTitle,
  selectIsPlaying,
  selectTime,
} from '../state/selectors';

import './index.css';

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
  }
)(props => props.url && <AudioPlayer {...props} />);

const AudioContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const ListLink = props => (
  <li style={{display: `inline-block`, margin: `0 1rem 0 0`}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Header = ({title}) => (
  <div
    style={{
      background: '#333',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1200,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <h1 style={{margin: 0}}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {title}
        </Link>
      </h1>
      <ul style={{listStyle: `none`, float: `right`, margin: `unset`}}>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/shows/">Shows</ListLink>
      </ul>
    </div>
  </div>
);

const TemplateWrapper = ({children, data}) => (
  <div
    style={{
      height: '100%',
    }}
  >
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {name: 'description', content: data.site.siteMetadata.description},
        {name: 'keywords', content: 'orbit.fm, podcast, audio, radio'},
      ]}
    />
    <Header title={data.site.siteMetadata.title} />
    <AudioContainer>
      <ConnectedAudioPlayer />
    </AudioContainer>
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
