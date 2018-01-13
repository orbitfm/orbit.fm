import React from 'react';
import styled from 'react-emotion';
import InfoBar from '../components/InfoBar';
import LatestEpisode from '../components/LatestEpisode';
import SidePanel from '../components/SidePanel';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 0;
  min-height: 100%;
`;

const MainArea = styled.div`
  padding: 20px;
`;

const Page = ({ children, primaryColor, title, description, episode }) => (
  <div>
    <InfoBar title={title} tagline={description} color={primaryColor} />
    <Container>
      <SidePanel>{episode && <LatestEpisode episode={episode} />}</SidePanel>
      <MainArea>{children}</MainArea>
    </Container>
  </div>
);

export default Page;
