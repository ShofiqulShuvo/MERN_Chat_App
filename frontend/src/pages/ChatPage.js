import React from "react";
import ChatPageBody from "../component/chats/ChatPageBody";
import Navbar from "../component/chats/Navbar";

import "./chatPage.css";

const ChatPage = () => {
  return (
    <>
      <div className="chat-page-nav">
        <Navbar />
      </div>
      <div className="chat-page-body mx-auto d-flex justify-content-between ">
        <ChatPageBody />
      </div>
    </>
  );
};

export default ChatPage;
