import React from 'react';
import Link from 'gatsby-link';
import { DateTime } from 'luxon';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import PageWithSidebar from '../components/PageWithSidebar';
import PodcastInfo from '../components/PodcastInfo';
import Subscribe from '../components/Subscribe';
import PlayButton from '../components/AudioPlayer/PlayButton';
import { playSong, playSongAtTime } from '../state/actions';
import { selectUrl, selectIsPlaying } from '../state/selectors';

const Remarkable = require('remarkable');
const markdown = new Remarkable({ html: true });

const AudioContainer = styled.div`
  margin: 40px 0;
`;

const TranscriptsContainer = styled.div`
  & a {
    text-decoration: underline;
  }
`;

const SmartPlayButton = ({
  url,
  podcast,
  title,
  playingUrl,
  isPlaying,
  onClick,
}) => (
  <PlayButton
    isPlaying={isPlaying && url === playingUrl}
    onClick={() => onClick({ url, podcast, title })}
  />
);

const ConnectedPlayButton = connect(
  state => ({
    isPlaying: selectIsPlaying(state),
    playingUrl: selectUrl(state),
  }),
  {
    onClick: playSong,
  }
)(SmartPlayButton);

const convertTimestampToTime = timestamp => {
  const timeSections = timestamp.split(':');
  const seconds = Number(timeSections[timeSections.length - 1]);
  const minutes = Number(timeSections[timeSections.length - 2]);
  const hours = Number(timeSections[timeSections.length - 3]);

  return hours * 3600 + minutes * 60 + seconds;
};

const Timestamp = ({ url, podcast, title, timestamp, onClick }) => (
  <p
    onClick={e => {
      e.preventDefault();
      onClick({ url, podcast, title, time: convertTimestampToTime(timestamp) });
    }}
  >
    {timestamp}
  </p>
);

const ConnectedTimestamp = connect(
  null,
  {
    onClick: playSongAtTime,
  }
)(Timestamp);

export default ({ data }) => {
  const episode = data.contentfulEpisode;
  const transcript = data.transcriptsJson && data.transcriptsJson.transcript;

  return (
    <PageWithSidebar
      title={
        <Link to={`/${episode.podcast.fields.slug}`}>
          {episode.podcast.name}
        </Link>
      }
      headTitle={episode.podcast.name}
      description={episode.podcast.description.description}
      color={episode.podcast.primaryColor}
      sidePanelChildren={
        <PodcastInfo
          imageSizes={episode.podcast.image.sizes}
          podcastDescription={episode.podcast.description.description}
          podcastName={episode.podcast.name}
          podcastHosts={episode.podcast.hosts.map(h => h.name)}
          podcastPath={episode.podcast.fields.slug}
        />
      }
    >
      <Subscribe links={episode.podcast.subscriptionLinks} />
      <h2>{episode.name}</h2>
      <p>{DateTime.fromISO(episode.publicationDate).toLocaleString()}</p>
      <div>{episode.shortDescription}</div>
      <AudioContainer>
        <ConnectedPlayButton
          url={`https://www.podtrac.com/pts/redirect.mp3/${episode.audioUrl}`}
          podcast={episode.podcast.name}
          title={episode.name}
        />
      </AudioContainer>
      <h3>Hosts</h3>
      <ul>
        {episode.hosts &&
          episode.hosts.map(host => (
            <li key={host.id}>
              <Link to={`/people/${host.fields.slug}`}>{host.name}</Link>
            </li>
          ))}
      </ul>
      {episode.guests && (
        <div>
          <h3>Guests</h3>
          <ul>
            {episode.guests.map(guest => (
              <li key={guest.id}>
                <Link to={`/people/${guest.fields.slug}`}>{guest.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {episode.fields.showNotesFormatted && (
        <div>
          <h1>Show Notes</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: episode.fields.showNotesFormatted,
            }}
          />
        </div>
      )}

      {transcript && (
        <div>
          <h1>Transcript</h1>
          <TranscriptsContainer>
            {transcript.map((item, i) => (
              <div name={item.timestamp} key={i}>
                <p>
                  <ConnectedTimestamp
                    url={`https://www.podtrac.com/pts/redirect.mp3/${
                      episode.audioUrl
                    }`}
                    podcast={episode.podcast.name}
                    title={episode.name}
                    timestamp={item.timestamp}
                  />{' '}
                  <b>{item.speaker}</b>
                </p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: markdown.render(item.text),
                  }}
                />
              </div>
            ))}
          </TranscriptsContainer>
        </div>
      )}
    </PageWithSidebar>
  );
};

export const query = graphql`
  query EpisodeQuery(
    $id: String!
    $podcastName: String
    $episodeNumber: String
  ) {
    contentfulEpisode(id: { eq: $id }) {
      name
      season
      episodeNumber
      shortDescription
      publicationDate
      audioUrl
      audioLength
      duration
      hosts {
        id
        name
        fields {
          slug
        }
      }
      guests {
        id
        name
        fields {
          slug
        }
      }
      podcast {
        id
        name
        primaryColor
        description {
          description
        }
        subscriptionLinks {
          id
          url
          linkType {
            image {
              resolutions(width: 40) {
                ...GatsbyContentfulResolutions
              }
            }
          }
        }
        fields {
          slug
        }
        hosts {
          name
        }
        image {
          sizes(maxWidth: 320) {
            ...GatsbyContentfulSizes
          }
        }
      }
      fields {
        showNotesFormatted
        path
      }
    }

    transcriptsJson(
      podcast: { eq: $podcastName }
      episode: { eq: $episodeNumber }
    ) {
      podcast
      episode
      transcript {
        text
        timestamp
        speaker
      }
    }
  }
`;
