import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({ data }) =>
  console.log(data) || (
    <div>
      <h1>Welcome to {data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
      <ul>
        {data.allContentfulPodcast.edges
          .filter(({ node }) => node.active)
          .map(({ node }) => (
            <li key={node.id}>
              <Link to={`/${node.fields.slug}`}>{node.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulPodcast {
      edges {
        node {
          id
          name
          active
          fields {
            slug
          }
        }
      }
    }
  }
`;
