import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { loginWithToken, noToken } from "../app/features/userSlice";

const useUserAuth = () => {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("chat_app_token"));

  const checkToken = async () => {
    const res = await fetch(`${BASE_URL}/user/authToken`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || data.message === "jwt expired") {
      dispatch(noToken());
    } else {
      dispatch(loginWithToken(data));
    }
  };

  if (token) {
    checkToken();
  } else {
    dispatch(noToken());
  }
};

export default useUserAuth;
