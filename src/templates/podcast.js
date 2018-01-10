import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => (
  <div>
    {data.contentfulPodcast.name}
    {data.contentfulPodcast.episode ? (
      <ul>
        {data.contentfulPodcast.episode
          .sort((a, b) => {
            if (a.publicationDate > b.publicationDate) {
              return -1;
            }
            if (b.publicationDate > a.publicationDate) {
              return 1;
            }
            return 0;
          })
          .map(e => (
            <li key={e.id}>
              <Link to={e.fields.path}>{e.name}</Link>
            </li>
          ))}
      </ul>
    ) : null}
  </div>
);

export const query = graphql`
  query PodcastQuery($id: String!) {
    contentfulPodcast(id: { eq: $id }) {
      name
      episode {
        id
        name
        publicationDate
        fields {
          path
        }
      }
    }
  }
`;
