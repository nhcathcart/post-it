import "../css/utility-css.css";
import "../css/LoginCard.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  loginUser,
  updatePassword,
  updateUsername,
} from "../reducers/loginReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [err, setErr] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(
        loginUser({ username: state.username, password: state.password })
      ).then((res) => {
        console.log("got dispatch response, ", res);
        if (res.payload !== "unauthorized") {
          console.log("login successful");
          navigate("/home");
        } else {
          setErr(true);
        }
      });
    } catch (error) {
      e.preventDefault();
      console.log("caught error");
      setErr(true);
    }
  };
  return (
    <>
      <div className="login-card">
        <h3 className="login-title">Login</h3>
        {err && <p>Invalid login</p>}
        <input
          type="text"
          className="login-input"
          placeholder="username"
          onChange={(e) => {
            dispatch(updateUsername(e.target.value));
          }}
        ></input>
        <input
          type="password"
          className="login-input"
          placeholder="password"
          onChange={(e) => {
            dispatch(updatePassword(e.target.value));
          }}
        ></input>
        <button
          className="button login-button"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          submit
        </button>
        <p className="login-link-text">
          New to catch-up? <a href="/create-user">Signup</a>{" "}
        </p>
      </div>
    </>
  );
}
