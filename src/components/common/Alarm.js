import React from 'react';
import styled from 'styled-components';

const Alarm = ({ text, handleClose }) => {
  return (
    <Container>
      <div className="content">
        <div className="text">
          {text}
        </div>
        <div className="button">
          <button type='button' onClick={() => handleClose(false)}>확인</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
  z-index: 11;
  .content {
    width: 15rem;
    padding: 1.5rem 2rem;
    font-size: 0.9rem;
    background: #fff;
    box-shadow: 0 2px 20px rgba(0,0,0,0.2);
    border-radius: 1.5rem;
    .text {
      padding: 0.5rem 0;
      text-align: center;
      border-radius: 1.5rem;
    }
    .button {
      width: 100%;
      margin-top: 1.2rem;
      text-align: right;
      button {
        font-weight: 500;
        color: #9575CD;
      }
    }
  }
`;

export default Alarm;