import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, getConfigureToken, postConfigureToken } from "../../api/api";
import { createGroupChat } from "../../app/features/chatSlice";
import "./createGroupChatModal.css";

const CreateGroupChatModal = ({ setGrpChatModal }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [chatName, setChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);

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

  const handleAddUser = (_id, name) => {
    const alreadyAdded = selectedUser.find((user) => user._id === _id);
    if (alreadyAdded) {
      toast.dismiss();
      toast.error("already selected this user");
    } else {
      setSelectedUser((user) => [...user, { _id, name }]);
    }
    setSearchedUser([]);
    setSearch("");
  };

  const removeSelecetedUser = (id) => {
    setSelectedUser(selectedUser.filter((user) => user._id !== id));
  };

  const createChat = async () => {
    toast.dismiss();
    toast.info("creating group chat...");
    if (selectedUser.length < 2) {
      toast.dismiss();
      toast.error("minimum 2 user need to select");
    } else {
      const users = selectedUser.map((user) => user._id);
      const name = chatName;
      const postData = { name, users };
      const res = await fetch(
        `${BASE_URL}/chats/group`,
        postConfigureToken(token, postData)
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(createGroupChat(data));
        toast.dismiss();
        toast.success("Group Chat Created");
        setChatName("");
        setGrpChatModal(false);
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="group-chat-modal">
      <div className="group-chat-modal-item py-1 px-2 rounded-2 shadow">
        <div className="w-100 d-flex align-items-center justify-content-between">
          <h5>Create Group Chat</h5>
          <button
            className="group-modal-close text-muted btn border-0"
            onClick={() => setGrpChatModal(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="mt-2 d-flex flex-column">
          <form className="w-100">
            <div className="mb-1">
              <label htmlFor="chatName" className="form-label fw-bold">
                Chat Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="chatName"
                placeholder="Chat Name"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="search" className="form-label fw-bold">
                Search User:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
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
          {selectedUser && (
            <div className="d-flex flex-wrap">
              {selectedUser.map((user, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "group-chat-selectedUser-cont d-flex align-items-center"
                    }
                  >
                    <div className="group-chat-selectedUser">{user.name}</div>
                    <button
                      className="group-chat-selectedUser-btn"
                      onClick={() => removeSelecetedUser(user._id)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {searchedUser && (
            <div className="searched-user-show p-1 mt-1">
              {searchedUser.map((user, i) => {
                const { name, _id, picture, email } = user;
                return (
                  <button
                    className="group-modal-add-btn btn text-start border-0 w-100 mt-4 p-2 d-flex shadow rounded "
                    onClick={() => handleAddUser(_id, name)}
                    key={i}
                  >
                    <div className="group-modal-img">
                      <img
                        className="h-100 w-100 rounded-circle"
                        src={picture}
                        alt=""
                      />
                    </div>
                    <div className="ms-2 group-modal-data">
                      <h6>{name}</h6>
                      <p>{email}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          <button className="btn btn-sm btn-primary mb-1" onClick={createChat}>
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupChatModal;
