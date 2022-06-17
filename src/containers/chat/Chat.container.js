import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../../modules/store';
import Chat from '../../components/chat/Chat';

const ChatContainer = ({ socket }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chatUser, setChatUser] = useState();
  const [chatData, setChatData] = useState();
  const [isChat, setIsChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);
  const currentUser = useStore((state) => state.user);

  // 상대 유저 가져오기
  const getUser = async () => {
    const resUser = await axios.get(`/api/auth/${id}`);
    setChatUser(resUser.data);
  }

  // 채팅방 가져오기
  const getChat = async () => {
    const { data } = await axios.post('/api/chat/', {
      currentUserId: currentUser._id,
      chatUserId: id,
      count: 'firstGet',
    });

    if (data.state) {
      setIsChat(true);
      setChatData(data.chat);
      setMessageList(data.chat.messages);
      setCurrentCount(data.count);
      socket.emit("join_room", data.chat._id);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getUser();
    getChat();

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  // 메세지 더 가져오기
  const getMoreMessage = async () => {
    if (currentCount < 1) {
      return
    }

    const { data } = await axios.post('/api/chat/', {
      currentUserId: currentUser._id,
      chatUserId: id,
      count: currentCount,
    });

    if (data) {
      setCurrentCount(data.count);
    }

    const moreMessages = [...data.chat.messages, ...messageList];

    setMessageList(moreMessages);
  }

  const handleClose = () => {
    navigate(-1);
  }

  // 메세지 전송
  const handleSendMessage = async (text) => {
    if (!isChat) {
      const { data } = await axios.post('/api/chat/create', {
        currentUserId: currentUser._id, chatUserId: id
      });
      setChatData(data.chat);
      setIsChat(true);
      socket.emit("join_room", data.chat._id);
      sendMessage(data.chat._id, text);
    } else {
      sendMessage(chatData._id, text);
    }
  }

  const sendMessage = async (id, text) => {
    const messageData = {
      room: id,
      messageId: uuidv4(),
      from: currentUser._id,
      content: text,
      sendDate: new Date(),
    }

    axios.post(`/api/chat/${id}`, messageData);
    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
  }

  return (
    <Chat
      isLoading={isLoading}
      currentUser={currentUser}
      chatUser={chatUser}
      getMoreMessage={getMoreMessage}
      handleSendMessage={handleSendMessage}
      handleClose={handleClose}
      messageList={messageList}
    />
  );
}

export default ChatContainer;