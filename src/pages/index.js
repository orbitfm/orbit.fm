import React from 'react';
import styled from 'react-emotion';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Page from '../components/Page';
import EpisodeListing from '../components/EpisodeListing';

const Listing = styled.ul`
  list-style: none;
  margin-top: -20px;
`;

const Show = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ShowImage = styled.span`
  display: inline-block;
  width: 75px;
  margin-right: 20px;
`;

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
  const latestEpisode = episodes[0];

  return (
    <Page
      title="Latest Episodes"
      description={data.site.siteMetadata.description}
      color={latestEpisode.podcast.primaryColor}
      sidePanelChildren={
        <Listing>
          <h2>Shows</h2>
          {data.allContentfulPodcast.edges.map(({ node }) => (
            <Show key={node.id}>
              <ShowImage>
                <Link to={`/${node.fields.slug}`}>
                  <Img fluid={node.image.fluid} />
                </Link>
              </ShowImage>
              <p>{node.name}</p>
            </Show>
          ))}
        </Listing>
      }
    >
      {episodes.slice(0, 10).map(episode => (
        <EpisodeListing
          shortDescription={episode.shortDescription}
          publicationDate={episode.publicationDate}
          name={episode.name}
          path={episode.fields.path}
          fluidImage={episode.podcast.image.fluid}
          podcastHosts={episode.podcast.hosts.map(h => h.name)}
          podcastName={episode.podcast.name}
          podcastPath={episode.podcast.fields.slug}
          key={episode.id}
        />
      ))}
      <Link to="shows">View all shows</Link>
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
    allContentfulPodcast(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
          shortDescription
          image {
            fluid(maxWidth: 75) {
              ...GatsbyContentfulFluid
            }
          }
          fields {
            slug
          }
          episode {
            id
            name
            publicationDate
            shortDescription
            fields {
              path
            }
            podcast {
              name
              primaryColor
              fields {
                slug
              }
              image {
                fluid(maxWidth: 700) {
                  ...GatsbyContentfulFluid
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
