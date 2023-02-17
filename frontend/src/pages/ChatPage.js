import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChat = async () => {
    const res = await fetch("http://localhost:3500/chats");
    const data = await res.json();
    setChats(data);
    console.log(data);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      {chats &&
        chats.map((chat) => {
          return <div key={chat._id}>{chat.chatName}</div>;
        })}
    </div>
  );
};

export default ChatPage;
