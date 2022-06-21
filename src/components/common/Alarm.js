import React from 'react';
import styled from 'styled-components';

const Alarm = ({ text, handleClose }) => {
  return (
    <Container>
      <div className="text">
        {text}
      </div>
      <div className="button">
        <button type='button' onClick={() => handleClose(false)}>확인</button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 15rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 2px 20px rgba(0,0,0,0.2);
  border-radius: 1.5rem;
  z-index: 11;
  .text {
    padding: 0.5rem 1.2rem;
    border-radius: 1.5rem;
  }
  .button {
    width: 100%;
    margin-top: 1rem;
    text-align: right;
    button {
      font-weight: 500;
      color: #9575CD;
    }
  }
`;

export default Alarm;