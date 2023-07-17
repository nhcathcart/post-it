import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkAuth } from "../reducers/loginReducer";


export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <div className="page-container">
        <Navbar />
    </div>
  );
}
