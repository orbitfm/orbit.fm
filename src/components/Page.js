import React from 'react';
import styled from 'react-emotion';
import InfoBar from '../components/InfoBar';
import SidePanel from '../components/SidePanel';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 0;
  min-height: 100%;
`;

const MainArea = styled.div`
  padding: 20px;
`;

const Page = ({ children }) => (
  <Container>
    <MainArea>{children}</MainArea>
  </Container>
);

export default Page;
