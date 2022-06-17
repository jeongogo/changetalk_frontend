import React, { useEffect, useRef, useState } from 'react';
import { debounce } from "lodash";
import styled from 'styled-components';
import { format } from 'date-fns';
import { FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import Loader from '../common/Loader';

const Chat = ({ isLoading, currentUser, chatUser, getMoreMessage, handleSendMessage, handleClose, messageList }) => {
  const [text, setText] = useState('');
  const [autoScrollBottom, setAutoScrollBottom] = useState(true);
  const textRef = useRef();
  const messagesEndRef = useRef(null);

  const handleCloseChat = () => {
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== '') {
      handleSendMessage(text);
      setText('');
      textRef.current.focus();
    }
  }

  const debounceScrollCheck = debounce((e) => scrollCheck(e), 100);

  const scrollCheck = (e) => {    
    const scrollTop = e.target.scrollTop;
    const divHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;

    if (scrollTop < 1) {
      getMoreMessage();
      setAutoScrollBottom(false);
      return false;
    }

    if (scrollTop + (divHeight * 2) < scrollHeight) {
      // 자동 bottom 중지
      setAutoScrollBottom(false);
    } else {
      // 자동 bottom 시작
      setAutoScrollBottom(true);
    }
  }

  useEffect(() => {
    if (messageList && autoScrollBottom) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [messageList]);

  useEffect(() => {
    setAutoScrollBottom(true);
  }, []);

  if (!chatUser) {
    return;
  }

  return (
    <Container>
      <div className="user-box">
        <button type='button' className='prev-btn' onClick={handleCloseChat}>
          <FiChevronLeft />
        </button>
        <div className="name">{chatUser.username}</div>
        <button type='button' className='more-btn'>
          <FiMoreVertical />
        </button>
      </div>
      <div className="message-box" onScroll={debounceScrollCheck}>
      {isLoading
        ?
        <Loader position='center' />
        :
        <>
          {messageList && messageList.map((message) => (
            <div key={message.messageId} className={`message ${message.from === currentUser._id ? 'me' : ''}`}>
              <div className='name'>
                {message.from === currentUser._id ? currentUser.username : chatUser.username} :
              </div>
              <div className='content'>
                {message.content}
              </div>
              {format(new Date(), 'yyyy.MM.dd') === format(new Date(message.sendDate), 'yyyy.MM.dd')
                ?
                  <div className="date">
                    {format(new Date(message.sendDate), 'HH:mm:ss')}
                  </div>
                :
                  <div className="date">
                    {format(new Date(message.sendDate), 'yyyy.MM.dd HH:mm:ss')}
                  </div>
              }
            </div>
          ))}
        </>
      }
      <div ref={messagesEndRef} />
      </div>
      <div className="input-box">
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textRef}
            onKeyPress={(e) => {
              e.key === "Enter" && handleSubmit(e);
            }}
          ></textarea>
          <button type='submit'>
            <MdSend />
          </button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  .user-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0 0.7rem;
    font-weight: bold;
    background-color: #a9bdce;
    button {
      &.prev-btn {
        font-size: 1.2rem;
        line-height: 0;
      }
      &.more-btn {
        font-size: 1rem;
        line-height: 0;
      }
    }
    .name {
      margin-right: auto;
      margin-left: 0.3rem;
      font-size: 0.9rem;
    }
  }
  .message-box {
    height: calc(100vh - 8rem);
    padding-bottom: 2px;
    background-color: #b2c7d9;
    padding: 1rem 0.5rem 0.5rem 1rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #8b9aa6;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .message {
      display: flex;
      align-items: center;
      margin-bottom: 0.6rem;
      &.me {
        justify-content: flex-end;
        .name {
          display: none;
        }
        .content {
          order: 2;
          margin-left: 0.4rem;
          background-color: #ffeb33;
          border-radius: 0.3rem 0 0.3rem 0.3rem;
        }
        .date {
          order: 1;
        }
      }
      .name {
        font-size: 0.8rem;
      }
      .content {
        margin-left: 0.5rem;
        margin-right: 0.3rem;
        padding: 0.4rem 0.8rem 0.5rem 0.6rem;
        font-size: 0.8rem;
        background-color: #fff;
        border-radius: 0 0.3rem 0.3rem 0.3rem;
        box-shadow: 1px 1px 2px rgba(0,0,0,0.05);
      }
      .date {
        margin-top: auto;
        font-size: 0.7rem;
        font-weight: 300;
      }
    }
  }
  .input-box {
    height: 5rem;
    form {
      position: relative;
      display: flex;
      align-items: flex-end;
      height: 100%;
      padding: 0.7rem;
      border-radius: 2rem;
      textarea {
        width: calc(100% - 4rem);
        height: 100%;
        font-size: 0.8rem;
        border: none;
        resize: none;
        outline: none;
        background-color: transparent;
        &::-webkit-scrollbar {
          width: 5px;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #C5CAE9;
          border-radius: 0.3rem;
        }
      }
      button {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 100%;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 0;
      }
    }
  }
`;

export default Chat;