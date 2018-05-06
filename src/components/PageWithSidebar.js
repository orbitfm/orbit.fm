import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { Helmet } from "react-helmet";
import SidePanel from "./SidePanel";
import * as COLORS from "../constants/colors";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(200px, 400px) minmax(300px, 800px) 1fr;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Color = styled.div`
  background: ${props => props.color};
`;
Color.propTypes = {
  color: PropTypes.string.isRequired
};
Color.defaultProps = {
  color: COLORS.BRAND
};

const BannerContainer = styled.div`
  background: ${props => props.color};
  padding: 40px;
  color: white;
`;
BannerContainer.propTypes = {
  color: PropTypes.string.isRequired
};
BannerContainer.defaultProps = {
  color: COLORS.BRAND
};

const SideContainer = styled.div`
  grid-column: 2 / 2;
  @media (max-width: 700px) {
    grid-column: 1 / -1;
  }
`;

const MainContainer = styled.div`
  grid-column: 3 / 3;
  padding: 40px;
  @media (max-width: 700px) {
    grid-column: 1;
    padding: 20px;
  }
`;

const PageWithSidebar = ({
  children,
  sidePanelChildren,
  color,
  title,
  description,
  episode,
  headTitle
}) => (
  <Container>
    {headTitle ? <Helmet title={`${headTitle} - Orbit FM`} /> : null}
    <Color color={color} />
    <Color color={color} />
    <BannerContainer color={color}>
      <h1>{title}</h1>
      <p>{description}</p>
    </BannerContainer>
    <Color color={color} />
    <SideContainer>
      <SidePanel>{sidePanelChildren}</SidePanel>
    </SideContainer>
    <MainContainer>{children}</MainContainer>
  </Container>
);

PageWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  sidePanelChildren: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired
  ]),
  description: PropTypes.string.isRequired,
  headTitle: PropTypes.string
};

PageWithSidebar.propTypes = {
  color: COLORS.BRAND
};

export default PageWithSidebar;
