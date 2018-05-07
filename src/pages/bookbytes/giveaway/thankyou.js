import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import PageWithSidebar from '../../../components/PageWithSidebar';
import bookCover from '../../../images/technically-wrong.jpg';

const Image = styled.img`
  margin-top: -150px;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

const ThankyouPage = ({data}) => (
  <PageWithSidebar
    title={`Book Giveaway!`}
    headTitle="Book Givaway"
    description={`Because books are awesome`}
    color="#33444c"
    sidePanelChildren={<Image src={bookCover} />}
  >
    <h2>Thank you!</h2>
    <p>
      Thank you so much for listening! And if you aren't already, feel free to{' '}
      <a
        href="https://twitter.com/bookbytesfm"
        style={{textDecoration: 'underline'}}
      >
        follow us on Twitter
      </a>.
    </p>
  </PageWithSidebar>
);

export default ThankyouPage;
