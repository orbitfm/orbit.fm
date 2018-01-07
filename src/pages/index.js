import React from 'react';
import Link from 'gatsby-link';

const IndexPage = () => (
  <div>
    <h1>Welcome to Orbit.fm</h1>
    <p>Orbit.fm is a place with podcasts.</p>
    <Link to="/bookbytes/">BookBytes</Link>
  </div>
);

export default IndexPage;
