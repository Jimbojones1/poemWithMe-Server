import React from "react";
import { Route, Link, Routes } from "react-router";
import LoginContainer from "../login/LoginContainer";
import ChatRoom from "../chatroom/chatRoomContainer";
import PoemRoom from "../poemRoom/poemRoomContainer";
import "./app.css";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/chat" element={<ChatRoom />} />
      <Route path="/poemRoom" element={<PoemRoom />} />
    </Routes>
  );
}
 

