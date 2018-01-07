import React from 'react';
import Link from 'gatsby-link';

const Shows = ({ data }) => (
  <div>
    <h1>Shows</h1>
    <ul>
      {data.allContentfulPodcast.edges
        .filter(({ node }) => node.active)
        .map(({ node }) => (
          <li key={node.id}>
            <Link to={`/${node.fields.slug}`}>{node.name}</Link>
            <p>{node.description}</p>
          </li>
        ))}
    </ul>
  </div>
);

export default Shows;

export const query = graphql`
  query ShowsQuery {
    allContentfulPodcast {
      edges {
        node {
          id
          name
          description
          active
          fields {
            slug
          }
        }
      }
    }
  }
`;
