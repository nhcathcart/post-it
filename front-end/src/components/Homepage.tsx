import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkUserAuth } from "../reducers/loginReducer";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);

  
 

  return (
    <div className="page-container">
      <Navbar />
    </div>
  );
}
