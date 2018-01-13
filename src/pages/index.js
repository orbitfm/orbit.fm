import React from 'react';
import Link from 'gatsby-link';
import Page from '../components/Page';
import EpisodeListing from '../components/EpisodeListing';

const IndexPage = ({ data }) => {
  const episodes = data.allContentfulPodcast.edges
    .reduce((a, e) => [...a, ...e.node.episode], [])
    .sort((a, b) => {
      if (a.publicationDate > b.publicationDate) {
        return -1;
      }
      if (b.publicationDate > a.publicationDate) {
        return 1;
      }
      return 0;
    });
  return (
    <Page
      title={data.site.siteMetadata.title}
      description={data.site.siteMetadata.description}
      primaryColor={episodes[0].podcast.primaryColor}
      episode={episodes[0]}
    >
      {episodes
        .slice(0, 10)
        .map(episode => <EpisodeListing episode={episode} key={episode.id} />)}
    </Page>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulPodcast(filter: { active: { eq: true } }, limit: 5) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
          episode {
            id
            name
            publicationDate
            shortDescription
            podcast {
              name
              primaryColor
              fields {
                slug
              }
              image {
                file {
                  url
                }
              }
              hosts {
                id
                name
                fields {
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`;
