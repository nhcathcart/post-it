import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import LoginCard from "./LoginCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { checkUserAuth } from "../reducers/loginReducer";

export default function LoginPage() {
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("checking login, ", state.isLoggedIn);
    if (state.isLoggedIn) {
      console.log("state is yes");
      navigate("/home");
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    console.log("checkign user auth");
    dispatch(checkUserAuth());
  });

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <LoginCard />
      </div>
    </div>
  );
}
