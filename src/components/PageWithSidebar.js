import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import InfoBar from './InfoBar';
import SidePanel from './SidePanel';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  max-width: 1200px;
  margin: 0 auto;
`;

const RightSide = styled.div`
  margin-left: 40px;
`;

const MainArea = styled.div`
  padding: 20px;
`;

const PageWithSidebar = ({
  children,
  sidePanelChildren,
  color,
  title,
  description,
  episode,
}) => (
  <div>
    <InfoBar color={color}>
      <Container>
        <div />
        <RightSide>
          <h1>{title}</h1>
          <p>{description}</p>
        </RightSide>
      </Container>
    </InfoBar>
    <Container>
      <SidePanel>{sidePanelChildren}</SidePanel>
      <MainArea>{children}</MainArea>
    </Container>
  </div>
);

PageWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidePanelChildren: PropTypes.node.isRequired,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PageWithSidebar;
