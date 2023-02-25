import React from "react";
import MyChats from "./MyChats";
import "./chatPageBody.css";
import { useSelector } from "react-redux";
import MessagesBox from "./MessagesBox";

const ChatPageBody = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <>
      <div
        className={`chat-page-body-mychat rounded-2 p-2 shadow ${
          selectedChat ? "hide-chat-page-body-mychat" : null
        }`}
      >
        <MyChats />
      </div>
      <div
        className={`chat-page-body-message rounded-2 shadow  p-2 ${
          selectedChat ? "show-chat-page-body-message" : null
        }`}
      >
        <MessagesBox />
      </div>
    </>
  );
};

export default ChatPageBody;
