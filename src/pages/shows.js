import React from 'react';
import styled from 'react-emotion';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
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

const Shows = ({ data }) => (
  <Layout>
    <Page title="Shows" headTitle="Shows">
      <Listing>
        {data.allContentfulPodcast.edges.map(({ node }) => (
          <Item key={node.id}>
            <ImageContainer>
              <Link to={`/${node.fields.slug}`}>
                <Img fluid={node.image.fluid} />
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
  </Layout>
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
            fluid(maxWidth: 150) {
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
