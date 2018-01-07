import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({ data }) => (
  <div>
    <h1>Welcome to {data.site.siteMetadata.title}</h1>
    <p>{data.site.siteMetadata.description}</p>
    <Link to="/bookbytes/">BookBytes</Link>
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
  }
`;
