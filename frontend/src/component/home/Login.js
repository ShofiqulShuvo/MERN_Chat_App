import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../app/features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);

  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      toast.error("please fill all the filds");
    } else {
      dispatch(login(userData));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginemail" className="form-label fw-bold">
            Email:
          </label>
          <input
            type="email"
            className="form-control "
            id="loginemail"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              className="form-control "
              id="password"
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
        <div className="mb-2">
          <button type="submit" className="btn btn-sm btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
