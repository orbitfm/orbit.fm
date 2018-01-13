import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import SidePanel from '../components/SidePanel';
import LatestEpisode from '../components/LatestEpisode';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  min-height: 100%;
`;

const MainArea = styled.div`
  padding: 20px;
`;

const IndexPage = ({ data }) => {
  const podcasts = data.allContentfulPodcast.edges
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
    <Container>
      <SidePanel>
        <LatestEpisode episode={podcasts[0]} />
      </SidePanel>
      <MainArea>
        <h1>Welcome to {data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.description}</p>
        <ul>
          {data.allContentfulPodcast.edges.map(({ node }) => (
            <li key={node.id}>
              <Link to={`/${node.fields.slug}`}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </MainArea>
    </Container>
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
