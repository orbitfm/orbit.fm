import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import PageWithSidebar from '../components/PageWithSidebar';

export default ({ data }) => {
  const podcast = data.contentfulPodcast;

  const episodes = podcast.episode
    ? podcast.episode.sort((a, b) => {
        if (a.publicationDate > b.publicationDate) {
          return -1;
        }
        if (b.publicationDate > a.publicationDate) {
          return 1;
        }
        return 0;
      })
    : [];
  return (
    <PageWithSidebar
      title={podcast.name}
      description={podcast.description.description}
      color={podcast.primaryColor}
      episode={episodes[0]}
    >
      <h2>Latest Episodes</h2>
      {episodes ? (
        <ul>
          {episodes.map(e => (
            <li key={e.id}>
              <Link to={e.fields.path}>{e.name}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </PageWithSidebar>
  );
};

export const query = graphql`
  query PodcastQuery($id: String!) {
    contentfulPodcast(id: { eq: $id }) {
      name
      description {
        description
      }
      primaryColor
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
        shortDescription
        publicationDate
        fields {
          path
        }
        podcast {
          name
          image {
            file {
              url
            }
          }
          hosts {
            name
          }
        }
      }
    }
  }
`;
