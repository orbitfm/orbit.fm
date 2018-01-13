import React from 'react';
import styled from 'react-emotion';
import InfoBar from './InfoBar';
import LatestEpisode from './LatestEpisode';
import SidePanel from './SidePanel';

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

const PageWithSidebar = ({
  children,
  primaryColor,
  title,
  description,
  episode,
}) => (
  <div>
    <InfoBar title={title} tagline={description} color={primaryColor} />
    <Container>
      <SidePanel>{episode && <LatestEpisode episode={episode} />}</SidePanel>
      <MainArea>{children}</MainArea>
    </Container>
  </div>
);

export default PageWithSidebar;
