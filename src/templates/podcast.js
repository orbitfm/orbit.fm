import React from 'react';

export default ({ data }) => (
  <div>
    {data.contentfulPodcast.name}
    {data.contentfulPodcast.episode ? (
      <ul>
        {data.contentfulPodcast.episode.map(e => <li key={e.id}>{e.name}</li>)}
      </ul>
    ) : null}
  </div>
);

export const query = graphql`
  query PodcastQuery($slug: String!) {
    contentfulPodcast(fields: { slug: { eq: $slug } }) {
      name
      episode {
        id
        name
      }
    }
  }
`;
