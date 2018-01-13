import React from 'react';
import Link from 'gatsby-link';
import Page from '../components/Page';

const Shows = ({ data }) => (
  <Page>
    <h1>Shows</h1>
    <ul>
      {data.allContentfulPodcast.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={`/${node.fields.slug}`}>{node.name}</Link>
          <p>{node.description.description}</p>
        </li>
      ))}
    </ul>
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
