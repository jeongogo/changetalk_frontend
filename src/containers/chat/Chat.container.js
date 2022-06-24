import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Peer from "simple-peer";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../../modules/store';
import Chat from '../../components/chat/Chat';
import Call from '../../components/chat/Call';

const ChatContainer = ({ socket }) => {
  const currentUser = useStore((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [chatUser, setChatUser] = useState();
  const [chatData, setChatData] = useState();
  const [hasChat, setHasChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [currentCount, setCurrentCount] = useState(0);
  
  const [showCall, setShowCall] = useState(false);

  const [stream, setStream] = useState();
  const [myID, setMyID] = useState();
  const [caller, setCaller] = useState();
  const [calling, setCalling] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connection = useRef();

  // 상대 유저 가져오기
  const getUser = async () => {
    const resUser = await axios.get(`/api/auth/${id}`, {
      headers: { authorization: 'Bearer ' + currentUser.accessToken }
    });
    setChatUser(resUser.data);
  }

  // 채팅방 가져오기
  const getChat = async () => {
    const { data } = await axios.post(
      '/api/chat/',
      {
        currentUserId: currentUser._id,
        chatUserId: id,
        count: 'firstGet',
      },
      {
        headers: { authorization: 'Bearer ' + currentUser.accessToken }
      }
    );

    if (data.state) {
      setHasChat(true);
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

    

    socket.on("get_id", (id) => {
      setMyID(id);
    });

    socket.on("caller", (data) => {
      setShowCall(true);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  // 메세지 더 가져오기
  const getMoreMessage = async () => {
    if (currentCount < 1) {
      return
    }

    const { data } = await axios.post(
      '/api/chat/',
      {
        currentUserId: currentUser._id,
        chatUserId: id,
        count: currentCount,
      },
      {
        headers: { authorization: 'Bearer ' + currentUser.accessToken }
      }
    );

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
    if (!hasChat) {
      const { data } = await axios.post(
        '/api/chat/create',
        {
          currentUserId: currentUser._id, chatUserId: id
        },
        {
          headers: { authorization: 'Bearer ' + currentUser.accessToken }
        }
      );
      setChatData(data.chat);
      setHasChat(true);
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

    axios.post(`/api/chat/${id}`, messageData, {
      headers: { authorization: 'Bearer ' + currentUser.accessToken }
    });
    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
  }

  // 전화 걸기
  const handleCall = () => {
    setShowCall(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("caller", {
        roomID: chatData._id,
        signalData: data,
        from: myID,
      });
      setCalling(true);
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("accept_call", (signal) => {
      setCallAccepted(true);
      setCalling(false);
      peer.signal(signal);
    });
    connection.current = peer;
  };

  // 전화 받기
  const handleAnswerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answer_call", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connection.current = peer;
  };

  // 전화 끊기
  const handleCloseCall = () => {
    // peer.on('close', () => {})
  }

  return (
    <>    
      <Chat
        isLoading={isLoading}
        currentUser={currentUser}
        chatUser={chatUser}
        getMoreMessage={getMoreMessage}
        handleSendMessage={handleSendMessage}
        handleClose={handleClose}
        messageList={messageList}
        handleCall={handleCall}
      />
      {showCall && (
        <Call
          handleAnswerCall={handleAnswerCall}
          calling={calling}
          receivingCall={receivingCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          setStream={setStream}
          stream={stream}
          handleCloseCall={handleCloseCall}
        />
      )}
    </>
  );
}

export default ChatContainer;