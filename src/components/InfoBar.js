import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import * as COLORS from '../constants/colors';

const Container = styled.div`
  background: ${props => props.color};
  padding: 40px 0;
  color: white;
`;

const InnerContainer = styled.div`
  padding-left: 20px;
`;

const InfoBar = ({ children, color }) => (
  <Container color={color}>
    <InnerContainer>{children}</InnerContainer>
  </Container>
);

InfoBar.propTypes = {
  color: PropTypes.string.isRequired,
};

InfoBar.defaultProps = {
  color: COLORS.BRAND,
};

export default InfoBar;
