import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => (
  <div>
    {data.contentfulPodcast.name}
    {data.contentfulPodcast.episode ? (
      <ul>
        {data.contentfulPodcast.episode.map(e =>
          <li key={e.id}><Link to={e.fields.path}>{e.name}</Link></li>
        )}
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
        fields {
          path
        }
      }
    }
  }
`;
