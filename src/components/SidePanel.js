import React from "react";
import styled from "react-emotion";

const Container = styled.div`
  background: #222;
  padding: 40px;
  color: white;
`;

const SidePanel = ({ children }) => <Container>{children}</Container>;

export default SidePanel;
