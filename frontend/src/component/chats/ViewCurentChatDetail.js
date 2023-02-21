import React from "react";
import { useSelector } from "react-redux";
import { getChatProfile } from "../../utility/chatPageLogic";
import ProfileModal from "../ProfileModal";
import ViewCurentGroupChatModal from "./ViewCurentGroupChatModal";

const ViewCurentChatDetail = ({ setViewDetail }) => {
  const { userData } = useSelector((state) => state.user);
  const { currentChat } = useSelector((state) => state.chat);
  const { isGroupChat } = currentChat;
  const user = getChatProfile(userData, currentChat.users);

  return (
    <>
      {isGroupChat ? (
        <ViewCurentGroupChatModal
          setViewDetail={setViewDetail}
          currentChat={currentChat}
        />
      ) : (
        <ProfileModal setViewProfile={setViewDetail} data={user} />
      )}
    </>
  );
};

export default ViewCurentChatDetail;
