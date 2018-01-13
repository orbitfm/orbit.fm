import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import InfoBar from './InfoBar';
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
  sidePanelChildren,
  primaryColor,
  title,
  description,
  episode,
}) => (
  <div>
    <InfoBar title={title} tagline={description} color={primaryColor} />
    <Container>
      <SidePanel>{sidePanelChildren}</SidePanel>
      <MainArea>{children}</MainArea>
    </Container>
  </div>
);

PageWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidePanelChildren: PropTypes.node.isRequired,
  primaryColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PageWithSidebar;
