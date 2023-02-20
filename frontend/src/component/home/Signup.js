import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../../app/features/userSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    image: "",
  };

  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleimageChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      toast.dismiss();
      toast.error("please fill all the field");
    } else if (!userData.image) {
      toast.dismiss();
      toast.error("please select a profile image");
    }

    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("image", userData.image);

    dispatch(signup(formData));
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
          <label htmlFor="image" className="form-label fw-bold">
            Profile image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept={"image/png" && "image/jpg" && "image/jpeg"}
            name="image"
            onChange={handleimageChange}
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
