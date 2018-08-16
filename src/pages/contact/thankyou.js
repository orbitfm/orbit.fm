import React from 'react';
import PageWithSidebar from '../../components/PageWithSidebar';

const ThankyouPage = ({ data }) => (
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
);

export default ThankyouPage;
