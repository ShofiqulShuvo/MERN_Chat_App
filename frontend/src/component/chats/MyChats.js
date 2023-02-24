import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat, goToChat } from "../../app/features/chatSlice";
import {
  getChatName,
  getLastMessageSenderName,
} from "../../utility/chatPageLogic";
import CreateGroupChatModal from "./CreateGroupChatModal";

const MyChats = () => {
  const dispatch = useDispatch();

  const [grpChatModal, setGrpChatModal] = useState(false);

  const { token, userData } = useSelector((state) => state.user);

  const { chat } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChat(token));
    // eslint-disable-next-line
  }, []);

  const handleChat = (chat) => {
    dispatch(goToChat(chat));
  };
  return (
    <>
      <div className="p-2">
        <div className="d-flex justify-content-between ">
          <h5>My Chats</h5>
          <button
            className="btn btn-sm  btn-outline-dark "
            onClick={() => setGrpChatModal(true)}
          >
            Create Group
          </button>
        </div>
        <div className="mt-2">
          {chat &&
            chat.map((chat, i) => {
              const { isGroupChat, chatName, users, latestMessage } = chat;
              return (
                <button
                  key={i}
                  className="btn btn-sm btn-outline-dark text-start border-0 w-100 mt-4 p-2 shadow rounded"
                  onClick={() => handleChat(chat)}
                >
                  <h6 className="fw-bold">
                    {isGroupChat ? chatName : getChatName(userData, users)}
                  </h6>
                  {latestMessage && (
                    <div className="d-flex align-items-start opacity-75 m-0">
                      <p className="p-0 m-0 fw-bold">
                        {getLastMessageSenderName(
                          userData,
                          latestMessage.sender
                        )}
                        :
                      </p>
                      <p className="p-0 m-0 ms-1">
                        {latestMessage.content.substr(0, 10)}...
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>
      {grpChatModal && (
        <CreateGroupChatModal setGrpChatModal={setGrpChatModal} />
      )}
    </>
  );
};

export default MyChats;
