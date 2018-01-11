import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Link from 'gatsby-link';

export default ({ data }) => {
  const episode = data.contentfulEpisode;
  return (
    <div>
      <h1>
        <Link to={episode.podcast.fields.slug}>{episode.podcast.name}</Link>
      </h1>
      <div>{episode.name}</div>
      <div>{episode.shortDescription}</div>
      <div>{episode.publicationDate}</div>
      <ReactAudioPlayer src={episode.audioUrl} preload="none" controls />
      <div>
        {episode.hosts &&
          episode.hosts.map(host => (
            <div key={host.id}>
              <Link to={`/people/${host.fields.slug}`}>{host.name}</Link>
            </div>
          ))}
      </div>
      <ul>
        {episode.guests &&
          episode.guests.map(guest => (
            <div key={guest.id}>
              <Link to={`/people/${guest.fields.slug}`}>{guest.name}</Link>
            </div>
          ))}
      </ul>

      <div>
        <h1> Show Notes </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: episode.fields.showNotesFormatted,
          }}
        />
      </div>
    </div>
  );
};

export const query = graphql`
  query EpisodeQuery($id: String!) {
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
        fields {
          slug
        }
      }
      fields {
        showNotesFormatted
      }
    }
  }
`;
