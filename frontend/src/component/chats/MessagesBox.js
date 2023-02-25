import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeChat, updateNotification } from "../../app/features/chatSlice";
import { getChatName, getChatPicture } from "../../utility/chatPageLogic";
import ViewCurentChatDetail from "./ViewCurentChatDetail";
import { toast } from "react-toastify";
import { BASE_URL, getConfigureToken, postConfigureToken } from "../../api/api";
import Spiners from "../Spiners";
import Messages from "./Messages";
import { io } from "socket.io-client";

// css
import "./messagesBox.css";

let socket;
let compareChat;

const MessagesBox = () => {
  const dispatch = useDispatch();

  const { token, userData } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);

  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // const [socketConect, setSocketConect] = useState(false);

  const [viewDetail, setViewDetail] = useState(false);

  const fetchMessage = async () => {
    if (currentChat) {
      try {
        setIsLoading(true);

        const res = await fetch(
          `${BASE_URL}/message/${currentChat._id}`,
          getConfigureToken(token)
        );
        const data = await res.json();
        if (res.ok) {
          setMessages(data);
          setIsLoading(false);

          socket.emit("joinChat", currentChat._id);
        } else {
          setIsLoading(false);
          toast.dismiss();
          toast.error(data.message);
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchMessage();
    compareChat = currentChat;
    // eslint-disable-next-line
  }, [currentChat]);

  // socket io
  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", userData);
    socket.on("connection");
  }, [userData]);

  useEffect(() => {
    socket.on("messageRecive", (newMessage) => {
      if (compareChat && compareChat._id === newMessage.chat._id) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        dispatch(updateNotification(newMessage));
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const postData = { chatId: currentChat._id, content: sendMessage };

    if (sendMessage) {
      try {
        const res = await fetch(
          `${BASE_URL}/message`,
          postConfigureToken(token, postData)
        );
        const data = await res.json();
        if (res.ok) {
          setMessages((prev) => [...prev, data]);
          socket.emit("newMessage", data);
          setSendMessage("");
        } else {
          toast.dismiss();
          toast.error("failed to send message");
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {currentChat ? (
        <>
          <div className="message-box-head d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button
                className="message-box-head-back"
                onClick={() => dispatch(closeChat())}
              >
                <FaArrowLeft />
              </button>
              <div className="ms-3 d-flex align-items-baseline">
                {currentChat.isGroupChat ? (
                  <div className="message-box-head-name">
                    {currentChat.chatName}
                  </div>
                ) : (
                  <>
                    <div className="message-box-head-image  rounded-circle shadow-sm">
                      <img
                        className="w-100 h-100 rounded-circle"
                        src={getChatPicture(userData, currentChat.users)}
                        alt=""
                      />
                    </div>
                    <div className="ms-1 message-box-head-name">
                      {getChatName(userData, currentChat.users)}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <button
                className="message-box-head-view"
                onClick={() => setViewDetail(true)}
              >
                <FaEye />
              </button>
              {viewDetail ? (
                <ViewCurentChatDetail setViewDetail={setViewDetail} />
              ) : null}
            </div>
          </div>
          <div className="message-box-head-message rounded-2 p-1">
            <div className="messages-cont px-2 pb-2">
              <div className="messages ">
                {isLoading ? <Spiners /> : <Messages messages={messages} />}
              </div>
              <form
                className="send-message w-100 px-2"
                onSubmit={handleSendMessage}
              >
                <div className="d-flex">
                  <textarea
                    type="text"
                    className="send-message-text-area form-control form-control-sm"
                    placeholder="Write your message"
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                  />
                  <button className="ms-2 btn btn-sm btn-primary" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <h4 className="text-muted">For Chating Select A Chat</h4>
        </div>
      )}
    </>
  );
};

export default MessagesBox;
