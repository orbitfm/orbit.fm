import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'react-emotion';

import Page from '../../components/Page';

const SponsorPage = ({ data, location }) => {
  return (
    <Page title={`Sponsors`} headTitle="Sponsors">
      <p>Orbit FM is sponsored by:</p>
      <a
        href="https://www.stickermule.com/supports/orbit"
        target="_blank"
        rel="noopener"
      >
        <Img
          sizes={data.stickerMule.childImageSharp.sizes}
          style={{ maxWidth: 500 }}
        />
      </a>
    </Page>
  );
};

export default SponsorPage;

export const query = graphql`
  query SponsorsQuery {
    stickerMule: file(relativePath: { eq: "pages/sponsors/sticker-mule.png" }) {
      childImageSharp {
        sizes(maxWidth: 940, maxHeight: 300) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
