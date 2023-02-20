import React from "react";
import { FaTimes } from "react-icons/fa";
import "./profilemodal.css";

const ProfileModal = ({ setViewProfile, data }) => {
  return (
    <div className="profile-modal ">
      <div className="profile-model-item shadow p-4 rounded-2">
        <div className="position-relative d-block w-100">
          <div className="profile-modal-img ">
            <img
              className="mh-100 mw-100 rounded-circle"
              src={data.picture}
              alt=""
            />
          </div>
          <button
            className="profile-modal-btn btn"
            onClick={() => setViewProfile(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className="profile-modal-detail">
          <h3>{data.name}</h3>
          <h6>{data.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
