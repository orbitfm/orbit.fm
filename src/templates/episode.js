import React from 'react';

export default ({ data }) => (
  <div>
    <div>{data.contentfulEpisode.podcast.name}</div>
    <div>{data.contentfulEpisode.name}</div>
    <div>{data.contentfulEpisode.season}</div>
    <div>{data.contentfulEpisode.shortDescription}</div>
    <div>{data.contentfulEpisode.publicationDate}</div>
    <div>{data.contentfulEpisode.audioUrl}</div>
    <div>
      {data.contentfulEpisode.hosts &&
        data.contentfulEpisode.hosts.map(host => (
          <div key={host.id}>{host.name}</div>
        ))}
    </div>
    <ul>
      {data.contentfulEpisode.guests &&
        data.contentfulEpisode.guests.map(guest => (
          <li key={guest.id}>{guest.name}</li>
        ))}
    </ul>

    <div>
      <h1> Show Notes </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulEpisode.fields.showNotesFormatted
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
        links {
          internal {
            content
          }
        }
      }
      guests {
        id
        name
        links {
          internal {
            content
          }
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
