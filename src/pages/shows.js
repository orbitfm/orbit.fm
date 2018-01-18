import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import Page from '../components/Page';

const Listing = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 100%;
  max-width: 150px;
  margin-right: 20px;
`;

const Shows = ({ data }) => (
  <Page title="Shows">
    <Listing>
      {data.allContentfulPodcast.edges.map(({ node }) => (
        <Item key={node.id}>
          <Image src={node.image.file.url} />
          <div>
            <Link to={`/${node.fields.slug}`}>
              <h2>{node.name}</h2>
            </Link>
            <p>{node.description.description}</p>
          </div>
        </Item>
      ))}
    </Listing>
  </Page>
);

export default Shows;

export const query = graphql`
  query ShowsQuery {
    allContentfulPodcast(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
          image {
            file {
              url
            }
          }
          description {
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
