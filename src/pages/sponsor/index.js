import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import style from 'react-emotion';

import Layout from '../../components/Layout';
import Page from '../../components/Page';

const SponsorPage = ({ data }) => (
  <Layout>
    <Page title={`Sponsors`} headTitle="Sponsors">
      <p>
        If you would like sponsor one of the shows, please send an email at{' '}
        <a href="mailto:hello@orbit.fm.">hello@orbit.fm.</a>
      </p>
    </Page>
  </Layout>
);

export default SponsorPage;
