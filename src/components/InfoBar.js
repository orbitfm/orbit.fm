import React from 'react';
import styled from 'react-emotion';

const Container = styled.div`
  background: #2486a1;
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

const InfoBar = ({ title, tagline }) => (
  <Container>
    <InnerContainer>
      <div />
      <RightSide>
        <p>{title}</p>
        <p>{tagline}</p>
      </RightSide>
    </InnerContainer>
  </Container>
);

export default InfoBar;
