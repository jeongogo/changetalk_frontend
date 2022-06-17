import React from 'react';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components';

const Loader = ({ position }) => {
  return (
    <Container className={position}>
      <ThreeDots color="#7986CB" height={40} width={40} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.full {
    width: 100%;
    height: calc(100vh - 3rem);
  }
  &.center {
    width: 100%;
    height: 100%;
  }
`;

export default Loader;