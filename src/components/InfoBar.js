import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import * as COLORS from '../constants/colors';

const Container = styled.div`
  background: ${props => props.color};
  padding: 40px;
  color: white;
`;

const InnerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
`;

const RightSide = styled.div`
  margin-left: 40px;
`;

const InfoBar = ({ title, tagline, color }) => (
  <Container color={color}>
    <InnerContainer>
      <div />
      <RightSide>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </RightSide>
    </InnerContainer>
  </Container>
);

InfoBar.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

InfoBar.defaultProps = {
  color: COLORS.BRAND,
};

export default InfoBar;
