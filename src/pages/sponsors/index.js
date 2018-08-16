import React from 'react';
import Img from 'gatsby-image';

import Layout from '../../components/Layout';
import Page from '../../components/Page';

const SponsorPage = ({ data, location }) => (
  <Layout>
    <Page title={`Sponsors`} headTitle="Sponsors">
      <p>Orbit FM is sponsored by:</p>
      <a
        href="https://www.stickermule.com/supports/orbit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Img
          sizes={data.stickerMule.childImageSharp.sizes}
          style={{ maxWidth: 500 }}
        />
      </a>
    </Page>
  </Layout>
);

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
