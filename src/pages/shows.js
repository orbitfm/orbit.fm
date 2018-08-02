import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'react-emotion';

import Page from '../components/Page';

const Listing = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 150px;
  margin: 0 20px 20px 0;
`;

const Shows = ({data}) => (
  <Page title="Shows" headTitle="Shows">
    <Listing>
      {data.allContentfulPodcast.edges.map(({node}) => (
        <Item key={node.id}>
          <ImageContainer>
            <Link to={`/${node.fields.slug}`}>
              <Img sizes={node.image.sizes} />
            </Link>
          </ImageContainer>
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
    allContentfulPodcast(filter: {active: {eq: true}}) {
      edges {
        node {
          id
          name
          image {
            sizes(maxWidth: 150) {
              ...GatsbyContentfulSizes
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
