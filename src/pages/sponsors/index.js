import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../components/Layout';
import Page from '../../components/Page';

const SponsorPage = ({ data }) =>
  console.log(data) || (
    <Layout>
      <Page title={`Sponsors`} headTitle="Sponsors">
        <p>Orbit FM is sponsored by:</p>
        <a
          href="https://www.pluralsight.com/careers/engineering"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            fluid={data.psImage.childImageSharp.fluid}
            style={{ maxWidth: 500, margin: '40px 0' }}
          />
        </a>
        <p>
          Pluralsight is the technology skills platform. You can see where your
          skills stand, master the latest technologies and show off your
          expertise.
        </p>

        <p>They're currently hiring in Salt Lake City and Boston.</p>
        <a href="https://vschool.io/" target="_blank" rel="noopener noreferrer">
          <Img
            fluid={data.vSchool.childImageSharp.fluid}
            style={{ maxWidth: 500, margin: '40px 0' }}
          />
        </a>
        <p>
          V School is Utah’s highest ranked coding boot camp and the first of
          its kind in Utah.
        </p>
        <a
          href="https://www.stickermule.com/supports/orbit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Img
            fluid={data.stickerMule.childImageSharp.fluid}
            style={{ maxWidth: 500, margin: '40px 0' }}
          />
        </a>
        <p>
          Sticker Mule is the fastest and easiest way to buy custom printed
          products. 4 day turnaround and free online proofs. Free shipping.
        </p>
      </Page>
    </Layout>
  );

export default SponsorPage;

export const query = graphql`
  query SponsorsQuery {
    psImage: file(relativePath: { eq: "pages/sponsors/pluralsight.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    vSchool: file(relativePath: { eq: "pages/sponsors/vschool.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    stickerMule: file(relativePath: { eq: "pages/sponsors/sticker-mule.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
