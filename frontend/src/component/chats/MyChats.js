import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat, goToChat } from "../../app/features/chatSlice";
import { getChatName } from "../../utility/chatPageLogic";
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
              const { isGroupChat, chatName, users } = chat;
              return (
                <button
                  key={i}
                  className="btn btn-outline-secondary text-start border-0 w-100 mt-4 p-2 shadow rounded"
                  onClick={() => handleChat(chat)}
                >
                  <h5>
                    {isGroupChat ? chatName : getChatName(userData, users)}
                  </h5>
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
