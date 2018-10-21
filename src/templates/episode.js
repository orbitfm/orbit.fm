import React from 'react'
import { graphql, Link } from 'gatsby'
import { DateTime } from 'luxon'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import Img from 'gatsby-image'
import leftPad from 'left-pad'

import Layout from '../components/Layout'
import PageWithSidebar from '../components/PageWithSidebar'
import PodcastInfo from '../components/PodcastInfo'
import Subscribe from '../components/Subscribe'
import PlayButton from '../components/AudioPlayer/PlayButton'
import { playSong, playSongAtTime } from '../state/actions'
import { selectUrl, selectIsPlaying } from '../state/selectors'

const Remarkable = require('remarkable')
const markdown = new Remarkable({ html: true })

const AudioContainer = styled.div`
  margin: 40px 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const InlineList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  > * {
    margin-right: 10px;
  }
`

const HostImage = styled.span`
  > div {
    height: 40px;
    width: 40px;
  }
  img {
    max-width: 40px;
    max-height: 40px;
    border-radius: 4px;
  }
`

const getSpeakersImagesSrc = (speakersStr, hostsImages) => {
  if (
    !speakersStr ||
    !hostsImages ||
    speakersStr.toLowerCase() === 'all' ||
    speakersStr.includes('*')
  ) {
    return null
  }
  const names = speakersStr.split('&')
  return names.reduce((res, name) => {
    if (hostsImages[name.trim()]) {
      return [...res, hostsImages[name.trim()]]
    }
    return res
  }, [])
}

const SpeakersImages = props => {
  if (!props.src) {
    return null
  }
  return (
    <Row>
      {props.src.map((s, i) => (
        <HostImage
          key={i}
          style={{ marginLeft: `${i === 0 ? 0 : -20}px`, zIndex: `-${i}` }}
        >
          <Img fixed={s} />
        </HostImage>
      ))}
    </Row>
  )
}

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
)

const ConnectedPlayButton = connect(
  state => ({
    isPlaying: selectIsPlaying(state),
    playingUrl: selectUrl(state),
  }),
  {
    onClick: playSong,
  }
)(SmartPlayButton)

const convertTimestampToTime = timestamp => {
  const timeSections = timestamp.split(':')
  const seconds = Number(timeSections[timeSections.length - 1])
  const minutes = Number(timeSections[timeSections.length - 2])
  const hours = Number(timeSections[timeSections.length - 3])

  return hours * 3600 + minutes * 60 + seconds
}

const TimestampSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const Timestamp = ({ url, podcast, title, timestamp, onClick }) => (
  <TimestampSpan
    onClick={e => {
      e.preventDefault()
      onClick({ url, podcast, title, time: convertTimestampToTime(timestamp) })
    }}
  >
    {timestamp}
  </TimestampSpan>
)

const ConnectedTimestamp = connect(
  null,
  {
    onClick: playSongAtTime,
  }
)(Timestamp)

export default ({ data }) => {
  const episode = data.contentfulEpisode
  const transcript = data.transcriptsJson && data.transcriptsJson.transcript
  const transcriptsLink =
    'https://github.com/orbitfm/orbit.fm/tree/master/transcripts'
  const transcriptLink = `${transcriptsLink}/${episode.podcast.fields.slug}-${
    episode.season ? leftPad(episode.season, 3, '0') : ''
  }-${leftPad(episode.episodeNumber, 3, '0')}.json`
  const hostsImages =
    episode && episode.hosts
      ? episode.hosts.reduce((res, h) => {
          if (h.image && h.image.fixed && h.name) {
            res[h.name] = h.image.fixed
          }
          return res
        }, {})
      : null

  return (
    <Layout>
      <PageWithSidebar
        title={
          <Link to={`/${episode.podcast.fields.slug}`}>
            {episode.podcast.name}
          </Link>
        }
        headTitle={episode.podcast.name}
        description={episode.podcast.shortDescription}
        color={episode.podcast.primaryColor}
        sidePanelChildren={
          <PodcastInfo
            fluidImage={episode.podcast.image.fluid}
            podcastDescription={episode.podcast.description.description}
            podcastName={episode.podcast.name}
            podcastHosts={episode.podcast.hosts}
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
                <Link to={`/people/${host.fields.slug}`}>
                  <p>{host.name}</p>
                </Link>
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

        <div>
          <h1>Transcript</h1>
          {transcript ? (
            <h4>
              Help improve this transcript on{' '}
              <a href={transcriptLink}>GitHub</a>
            </h4>
          ) : (
            <h4>
              Help by adding a transcript on{' '}
              <a href={transcriptsLink}>GitHub</a>
            </h4>
          )}
          {transcript && (
            <div>
              {transcript.map((item, i) => (
                <div name={item.timestamp} key={i}>
                  <ConnectedTimestamp
                    url={`https://www.podtrac.com/pts/redirect.mp3/${
                      episode.audioUrl
                    }`}
                    podcast={episode.podcast.name}
                    title={episode.name}
                    timestamp={item.timestamp}
                  />
                  <InlineList>
                    <SpeakersImages
                      src={getSpeakersImagesSrc(item.speaker, hostsImages)}
                    />
                    <span>{item.speaker}</span>
                  </InlineList>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdown.render(item.text),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </PageWithSidebar>
    </Layout>
  )
}

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
        image {
          fixed(width: 40) {
            ...GatsbyContentfulFixed
          }
        }
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
        shortDescription
        description {
          description
        }
        image {
          fluid(maxWidth: 320) {
            ...GatsbyContentfulFluid
          }
        }
        subscriptionLinks {
          id
          url
          linkType {
            image {
              fixed(width: 40) {
                ...GatsbyContentfulFixed
              }
            }
          }
        }
        fields {
          slug
        }
        hosts {
          id
          name
          image {
            fluid(maxWidth: 100) {
              ...GatsbyContentfulFluid
            }
          }
          fields {
            slug
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
`
