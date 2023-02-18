import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL, postConfigureMultipart } from "../../api/api";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    picture: "",
  };

  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      toast.dismiss();
      toast.error("please fill all the field");
    } else if (!userData.picture) {
      toast.dismiss();
      toast.error("please select a profile picture");
    }

    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("picture", userData.picture);

    try {
      const res = await fetch(
        `${BASE_URL}/user/signup`,
        postConfigureMultipart(formData)
      );
      const data = await res.json();

      if (res.ok) {
        toast.dismiss();
        toast.success(data.message);
        console.log(data);
        localStorage.setItem("chat_app_token", JSON.stringify(data.token));
      } else {
        toast.dismiss();
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType={"multipart/form-data"}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label w-100 fw-bold">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginpassword" className="form-label fw-bold">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="form-control"
              id="loginpassword"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPass(!showPass)}
            >
              <FaEye />
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="picture" className="form-label fw-bold">
            Profile Picture:
          </label>
          <input
            type="file"
            className="form-control"
            id="picture"
            accept={"image/png" && "image/jpg" && "image/jpeg"}
            name="picture"
            onChange={handlePictureChange}
            required
          />
        </div>

        <div className="mb-2">
          <button type="submit" className="btn btn-sm btn-primary w-100">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
