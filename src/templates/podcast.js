import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => {
  const podcast = data.contentfulPodcast;
  return (
    <div>
      <h1>{podcast.name}</h1>
      {podcast.image && <img src={podcast.image.file.url} />}
      <h2>Hosts</h2>
      <ul>
        {podcast.hosts.map(host => (
          <li key={host.id}>
            <Link to={`/people/${host.fields.slug}`}>{host.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Latest Episodes</h2>
      {podcast.episode ? (
        <ul>
          {podcast.episode
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
};

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
      image {
        id
        file {
          url
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
