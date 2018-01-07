import React from 'react';

export default ({ data }) => (
  <div>
    {data.contentfulPodcast.name}
    <ul>
      {data.contentfulPodcast.episode.map(e => <li key={e.id}>{e.name}</li>)}
    </ul>
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
