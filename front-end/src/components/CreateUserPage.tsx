import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import CreateUserCard from "./CreateUserCard";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/");
    }
  }, [state.isLoggedIn]);
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <CreateUserCard />
      </div>
    </div>
  );
}
