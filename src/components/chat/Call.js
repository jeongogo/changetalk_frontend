import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FiPhoneIncoming, FiPhoneOff } from "react-icons/fi";

const Call = ({ handleAnswerCall, calling, receivingCall, callAccepted, myVideo, userVideo, setStream, stream }) => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }, []);

  return (
    <Container>
      <div className='call-box'>
        {receivingCall && !callAccepted && (
          <div>
            <button className='answer' onClick={handleAnswerCall}>
              <FiPhoneIncoming />
            </button>
            <p>전화 왔습니다!</p>
          </div>
        )}
        {calling && (
          <div>
            <p>연결중입니다.</p>
          </div>
        )}
        {callAccepted && (
          <div>
            <button className='end'>
              <FiPhoneOff />
            </button>
            <p>연결되었습니다.</p>
          </div>
        )}
      </div>
      <div className="video-box">
        <div className={`video me ${stream ? 'show' : ''}`}>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
          />
        </div>
        <div className={`video you ${callAccepted ? 'show' : ''}`}>
          <video
            playsInline
            ref={userVideo}
            autoPlay
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  .call-box {
    z-index: 2;
    div {
      text-align: center;
      z-index: 2;
      button {
        text-align: center;
        width: 4rem;
        height: 4rem;
        font-size: 1.5rem;
        color: #fff;
        border-radius: 50%;
        line-height: 0;
        &.call {
          background-color: #FF1744;
        }
        &.answer {
          background-color: #43A047;
        }
        &.end {
          background-color: #FF3D00;
        }
      }
      p {
        color: #fff;
      }
    }
  }
  .video-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .video {
      position: absolute;
      opacity: 0;
      &.show {
        opacity: 1;
      }
      &.me {
        top: 1rem;
        left: 1rem;
        width: 50vw;
        height: 35vw;
      }
      &.you {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default Call;