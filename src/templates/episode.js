import React from "react";
import ReactAudioPlayer from "react-audio-player";
import Link from "gatsby-link";
import { DateTime } from "luxon";
import styled from "react-emotion";
import PageWithSidebar from "../components/PageWithSidebar";
import PodcastInfo from "../components/PodcastInfo";
import Subscribe from "../components/Subscribe";

const AudioContainer = styled.div`
  margin: 40px 0;
`;

export default ({ data }) => {
  const episode = data.contentfulEpisode;
  const transcript = data.markdownRemark && data.markdownRemark.html;

  return (
    <PageWithSidebar
      title={
        <Link to={`/${episode.podcast.fields.slug}`}>
          {episode.podcast.name}
        </Link>
      }
      description={episode.podcast.description.description}
      color={episode.podcast.primaryColor}
      sidePanelChildren={
        <PodcastInfo
          imageUrl={
            episode.podcast.image && `https:${episode.podcast.image.file.url}`
          }
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
        <ReactAudioPlayer
          src={`https://www.podtrac.com/pts/redirect.mp3/${episode.audioUrl}`}
          preload="none"
          controls
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
              __html: episode.fields.showNotesFormatted
            }}
          />
        </div>
      )}

      {episode.fields.transcriptionFormatted && (
        <div>
          <h1>Transcript</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: transcript || episode.fields.transcriptionFormatted
            }}
          />
        </div>
      )}
    </PageWithSidebar>
  );
};

export const query = graphql`
  query EpisodeQuery($id: String!, $title: String) {
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
              file {
                url
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
          id
          file {
            url
          }
        }
      }
      fields {
        showNotesFormatted
        transcriptionFormatted
        path
      }
    }
    markdownRemark(frontmatter: {title: {eq: $title }}) {
      html
    }
  }
`;
