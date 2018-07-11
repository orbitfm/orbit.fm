import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import PageWithSidebar from '../../components/PageWithSidebar';

const Image = styled.img`
  margin-top: -150px;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

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
