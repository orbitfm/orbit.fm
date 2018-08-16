import React from 'react';

import Layout from '../../components/Layout';
import PageWithSidebar from '../../components/PageWithSidebar';

const ThankyouPage = ({ data }) => (
  <Layout>
    <PageWithSidebar
      title="Contact"
      headTitle="Contact"
      description="We'd love to hear from you"
      color="#33444c"
      sidePanelChildren=""
    >
      <h2>Thank you!</h2>
      <p>Thanks for contacting us!</p>
    </PageWithSidebar>
  </Layout>
);

export default ThankyouPage;
