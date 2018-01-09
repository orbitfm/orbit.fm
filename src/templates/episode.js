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
    <div>
      {data.contentfulEpisode.guests &&
        data.contentfulEpisode.guests.map(guest => (
          <div key={guest.id}>{guest.name}</div>
        ))}
    </div>
    <div>{data.contentfulEpisode.showNotes.internal.content}</div>
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
      showNotes {
        internal {
          content
        }
      }
      podcast {
        id
        name
      }
    }
  }
`;
