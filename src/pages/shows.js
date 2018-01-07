import React from 'react';
import Link from 'gatsby-link';

const urlify = a => a.replace(/\s/g, '').toLowerCase();

const Shows = ({ data }) => (
  <div>
    <h1>Shows</h1>
    <ul>
      {data.allContentfulPodcast.edges
        .filter(({ node }) => node.active)
        .map(({ node }) => (
          <li key={node.id}>
            <Link to={`/${urlify(node.name)}`}>{node.name}</Link>
          </li>
        ))}
    </ul>
  </div>
);

export default Shows;

export const query = graphql`
  query IndexQuery {
    allContentfulPodcast {
      edges {
        node {
          id
          name
          description
          active
        }
      }
    }
  }
`;
