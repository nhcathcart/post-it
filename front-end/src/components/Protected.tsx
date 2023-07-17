import { Outlet } from "react-router";
import { ReactNode, createContext, useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkUserAuth } from "../reducers/loginReducer"; 
import {useNavigate } from 'react-router-dom';
import Homepage from "./Homepage";


function Protected(children: any) {
  
  const state = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  if (!state.isLoggedIn) {
    return (
      <LoginPage />
    )
  } else return (
    <Homepage/>
  )
}

export default Protected;
