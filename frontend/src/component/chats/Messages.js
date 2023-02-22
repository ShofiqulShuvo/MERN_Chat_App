import React from "react";
import { useSelector } from "react-redux";
import "./messages.css";

const Messages = ({ messages }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="message-container w-100 d-flex flex-column ">
      {messages &&
        messages.map((message) => {
          const { sender, content, _id } = message;

          return (
            <div
              key={_id}
              className={`w-50 mt-2  ${
                userData._id === sender._id
                  ? "align-self-end"
                  : "align-self-start d-flex justify-content-start"
              }`}
            >
              {userData._id !== sender._id ? (
                <div className="message-sender-pic-cont rounded-circle me-2 ">
                  <img
                    className="message-sender-pic w-100 h-100"
                    src={sender.picture}
                    alt=""
                  />
                </div>
              ) : null}
              <p
                className={`message-text rounded-2 bg-opacity-25 p-2 shadow-sm ${
                  userData._id === sender._id
                    ? "bg-success float-end"
                    : "bg-primary "
                }`}
              >
                {content}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
