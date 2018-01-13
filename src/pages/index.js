import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import SidePanel from '../components/SidePanel';
import InfoBar from '../components/InfoBar';
import LatestEpisode from '../components/LatestEpisode';
import EpisodeListing from '../components/EpisodeListing';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 0;
  min-height: 100%;
`;

const MainArea = styled.div`
  padding: 20px;
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
  console.log(episodes[0].podcast.primaryColor);
  return (
    <div>
      <InfoBar
        title={data.site.siteMetadata.title}
        tagline={data.site.siteMetadata.description}
        color={episodes[0].podcast.primaryColor}
      />
      <Container>
        <SidePanel>
          <LatestEpisode episode={episodes[0]} />
        </SidePanel>
        <MainArea>
          {episodes
            .slice(0, 10)
            .map(episode => (
              <EpisodeListing episode={episode} key={episode.id} />
            ))}
        </MainArea>
      </Container>
    </div>
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
