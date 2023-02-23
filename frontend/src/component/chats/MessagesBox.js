import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, getConfigureToken, postConfigureToken } from "../../api/api";
import Spiners from "../Spiners";
import Messages from "./Messages";
import "./messagesBox.css";

const MessagesBox = () => {
  const { token } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);

  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessage = async () => {
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
      } else {
        setIsLoading(false);
        toast.dismiss();
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessage();
    // eslint-disable-next-line
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const postData = { chatId: currentChat._id, content: sendMessage };

    try {
      const res = await fetch(
        `${BASE_URL}/message`,
        postConfigureToken(token, postData)
      );
      const data = await res.json();
      if (res.ok) {
        setSendMessage("");
        setMessages((prev) => [...prev, data]);
      } else {
        toast.dismiss();
        toast.error("failed to send message");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  return (
    <div className="messages-cont px-2">
      <div className="messages ">
        {isLoading ? <Spiners /> : <Messages messages={messages} />}
      </div>
      <form className="send-message w-100 px-2" onSubmit={handleSendMessage}>
        <div className="d-flex">
          <textarea
            type="text"
            cols={1}
            rows={1}
            className="form-control form-control-sm"
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
  );
};

export default MessagesBox;
