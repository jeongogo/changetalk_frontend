import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronLeft } from "react-icons/fi";

const Header = ({ title, goBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <Container>
      {goBack && (
        <button type='button' onClick={handleBack}>
          <FiChevronLeft />
        </button>
      )}
      <h1>{title}</h1>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  button {
    margin-right: 0.3rem;
    font-size: 1.4rem;
    line-height: 0;
  }
  h1 {
    font-size: 1.3rem;
  }
`;

export default Header;