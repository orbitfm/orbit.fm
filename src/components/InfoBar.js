import React from 'react';
import styled from 'react-emotion';

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
        <p>{title}</p>
        <p>{tagline}</p>
      </RightSide>
    </InnerContainer>
  </Container>
);

InfoBar.defaultProps = {
  color: '#2486a1',
};

export default InfoBar;
