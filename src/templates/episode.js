import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Link from 'gatsby-link';

export default ({ data }) => (
  <div>
    <h1>{data.contentfulEpisode.podcast.name}</h1>
    <div>{data.contentfulEpisode.name}</div>
    <div>{data.contentfulEpisode.season}</div>
    <div>{data.contentfulEpisode.shortDescription}</div>
    <div>{data.contentfulEpisode.publicationDate}</div>
    <div>{data.contentfulEpisode.audioUrl}</div>
    <ReactAudioPlayer src={data.contentfulEpisode.audioUrl} controls />
    <div>
      {data.contentfulEpisode.hosts &&
        data.contentfulEpisode.hosts.map(host => (
          <div key={host.id}>
            <Link to={`/people/${host.fields.slug}`}>{host.name}</Link>
          </div>
        ))}
    </div>
    <ul>
      {data.contentfulEpisode.guests &&
        data.contentfulEpisode.guests.map(guest => (
          <div key={guest.id}>
            <Link to={`/people/${guest.fields.slug}`}>{guest.name}</Link>
          </div>
        ))}
    </ul>

    <div>
      <h1> Show Notes </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulEpisode.fields.showNotesFormatted,
        }}
      />
    </div>
  </div>
);

export const query = graphql`
  query EpisodeQuery($id: String!) {
    contentfulEpisode(id: { eq: $id }) {
      name
      season
      episodeNumber
      shortDescription
      publicationDate
      audioUrl
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
      }
      fields {
        showNotesFormatted
      }
    }
  }
`;
