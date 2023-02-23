import React from "react";
import ReactScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux";
import "./messages.css";

const Messages = ({ messages }) => {
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <ReactScrollableFeed>
        <div className="message-container w-100 d-flex flex-column px-2">
          {messages &&
            messages.map((message) => {
              const { sender, content, _id } = message;

              return (
                <div
                  key={_id}
                  className={`message mt-3  ${
                    userData._id === sender._id
                      ? "align-self-end"
                      : "align-self-start d-flex justify-content-start align-items-end"
                  }`}
                >
                  {userData._id !== sender._id ? (
                    <button
                      className="message-sender-pic-cont border-0 rounded-circle me-2 "
                      type="button"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={sender.name}
                    >
                      <img
                        className="message-sender-pic w-100 h-100"
                        src={sender.picture}
                        alt=""
                      />
                    </button>
                  ) : null}
                  <div
                    className={`message-text-cont ${
                      userData._id === sender._id ? "float-end" : null
                    }`}
                  >
                    <p
                      className={`message-text rounded-2 bg-opacity-50 m-0 p-2 shadow-sm ${
                        userData._id === sender._id
                          ? "bg-info float-end"
                          : "bg-primary "
                      }`}
                    >
                      {content}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </ReactScrollableFeed>
    </>
  );
};

export default Messages;
