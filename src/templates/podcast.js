import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => (
  <div>
    <h1>{data.contentfulPodcast.name}</h1>
    <h2>Hosts</h2>
    <ul>
      {data.contentfulPodcast.hosts.map(host => (
        <li key={host.id}>
          <Link to={`/people/${host.fields.slug}`}>{host.name}</Link>
        </li>
      ))}
    </ul>
    <h2>Latest Episodes</h2>
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
      hosts {
        id
        name
        fields {
          slug
        }
      }
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
