import React from "react";
import { Route, Routes } from "react-router-dom";
import useUserAuth from "../auth/useUserAuth";
import ChatPage from "../pages/ChatPage";
import Error from "../pages/Error";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const Index = () => {
  useUserAuth();

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Index;
