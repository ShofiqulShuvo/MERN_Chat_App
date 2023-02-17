import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import Home from "../pages/Home";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default Index;
