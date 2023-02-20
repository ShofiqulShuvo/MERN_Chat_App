import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

const Index = () => {
  const { isLogedIn } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isLogedIn ? <Home /> : <Navigate to={"/chat"} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Index;
