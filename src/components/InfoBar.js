import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import * as COLORS from '../constants/colors';

const Container = styled.div`
  background: ${props => props.color};
  padding: 40px;
  color: white;
`;

const InfoBar = ({ children, color }) => (
  <Container color={color}>{children}</Container>
);

InfoBar.propTypes = {
  color: PropTypes.string.isRequired,
};

InfoBar.defaultProps = {
  color: COLORS.BRAND,
};

export default InfoBar;
