import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, getConfigureToken, putConfigureToken } from "../../api/api";
import { leaveGroupChat, updateChat } from "../../app/features/chatSlice";
import "./viewCurentGroupChatModal.css";

const ViewCurentGroupChatModal = ({ setViewDetail, currentChat }) => {
  const dispatch = useDispatch();
  const { token, userData } = useSelector((state) => state.user);

  const [chatName, setChatName] = useState(currentChat.chatName);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);

  const removeUserFromGroup = async (id) => {
    toast.dismiss();
    toast.info("removing user");

    const updateDAta = { chatId: currentChat._id, userId: id };
    const res = await fetch(
      `${BASE_URL}/chats/group/remove`,
      putConfigureToken(token, updateDAta)
    );
    const data = await res.json();
    if (res.ok) {
      dispatch(updateChat(data));
      toast.dismiss();
      toast.success("user removed");
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  const handleUpdateChatName = async (e) => {
    e.preventDefault();

    if (chatName.length < 1) {
      toast.dismiss();
      toast.error("chat name can't be empty");
    } else {
      toast.dismiss();
      toast.info("updating chat name...");
      const updateData = { chatId: currentChat._id, chatName: chatName };
      const res = await fetch(
        `${BASE_URL}/chats/group/rename`,
        putConfigureToken(token, updateData)
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(updateChat(data));
        toast.dismiss();
        toast.success("Chat Name Updated");
        setViewDetail(false);
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.length < 1) {
      toast.dismiss();
      toast.error("please add search text before search");
    } else {
      const res = await fetch(
        `${BASE_URL}/user?search=${search}`,
        getConfigureToken(token)
      );
      const data = await res.json();
      if (res.ok) {
        toast.dismiss();
        setSearchedUser(data);
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    }
  };

  const handleAddUser = async (_id, name) => {
    const isExist = currentChat.users.find((user) => user._id === _id);

    if (isExist) {
      toast.dismiss();
      toast.error("user already in the group");
    } else {
      toast.dismiss();
      toast.info(`adding ${name} to group...`);

      const updateData = { chatId: currentChat._id, userId: _id };

      const res = await fetch(
        `${BASE_URL}/chats/group/add`,
        putConfigureToken(token, updateData)
      );
      const data = await res.json();

      if (res.ok) {
        dispatch(updateChat(data));

        setSearch("");
        setSearchedUser([]);

        toast.dismiss();
        toast.success(`${name} added to the group`);
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    }
  };

  const handleLeaveGroup = async () => {
    toast.dismiss();
    toast.info("leaving from group");

    const updateDAta = { chatId: currentChat._id, userId: userData._id };
    const res = await fetch(
      `${BASE_URL}/chats/group/remove`,
      putConfigureToken(token, updateDAta)
    );
    const data = await res.json();
    if (res.ok) {
      toast.dismiss();
      dispatch(leaveGroupChat(data));
    } else {
      toast.dismiss();
      toast.error(data.message);
    }
  };

  return (
    <div className="curent-group-chat-modal shadow p-2 rounded-2 ">
      <div className="curent-group-chat-modal-item p-2 rounded-2">
        <div className="d-flex justify-content-between w-100">
          <h5>{currentChat.chatName}</h5>
          <button
            className="curent-group-chat-modal-btn btn border-0"
            onClick={() => setViewDetail(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="d-flex flex-wrap mb-1">
          {currentChat.users
            .filter((user) => user._id !== userData._id)
            .map((user, i) => {
              return (
                <div
                  key={i}
                  className={
                    "curent-group-chat-user-cont d-flex align-items-center"
                  }
                >
                  <div className="curent-group-chat-user">{user.name}</div>
                  <button
                    className="curent-group-chat-user-btn"
                    onClick={() => removeUserFromGroup(user._id)}
                  >
                    x
                  </button>
                </div>
              );
            })}
        </div>
        <form className="mt-1">
          <div className="mb-1">
            <label htmlFor="chatName" className="form-label fw-bold">
              Chat Name:
            </label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control form-control-sm"
                id="chatName"
                placeholder="Chat Name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
              <button
                className="ms-2 btn btn-sm btn-success"
                onClick={handleUpdateChatName}
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <form className="w-100 mt-1">
          <div className="mb-2">
            <label htmlFor="search" className="form-label fw-bold">
              Search User:
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control "
                id="search"
                placeholder="search user for add"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary border-1 input-group-text"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
        {searchedUser && (
          <div className="searched-user-show p-1 mt-1">
            {searchedUser.map((user, i) => {
              const { name, _id, picture, email } = user;
              return (
                <button
                  className="curent-group-chat-add-btn btn text-start border-0 w-100 mt-1 p-2 d-flex shadow rounded "
                  onClick={() => handleAddUser(_id, name)}
                  key={i}
                >
                  <div className="curent-group-chat-img">
                    <img
                      className="h-100 w-100 rounded-circle"
                      src={picture}
                      alt=""
                    />
                  </div>
                  <div className="ms-2 curent-group-chat-data">
                    <h6>{name}</h6>
                    <p>{email}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        <button
          className="mt-3 w-100 btn btn-sm btn-danger"
          onClick={handleLeaveGroup}
        >
          Leave Group
        </button>
      </div>
    </div>
  );
};

export default ViewCurentGroupChatModal;
