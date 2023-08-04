import { useNavigate } from "react-router";
import "../css/Navbar.css";
import "../css/utility-css.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logoutUser } from "../reducers/loginReducer";

export function Navbar() {
  function toggleFullPageMenu() {
    const menu = document.querySelector(".full-page-menu");
    menu?.classList.toggle("full-page-menu-show");
  }
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  return (
    <nav className="nav green">
      <div className="title-container">
        <h1 className="title">catch-up</h1>
      </div>
      <div className={state.isLoggedIn ? "hamburger-menu" : "hidden"}>
        <button
          onClick={() => {
            toggleFullPageMenu();
          }}
          className="hamburger-menu-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hamburger-menu-button"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div className="full-page-menu">
        <button
          className="nav-button-full"
          onClick={() => {
            navigate("/")
            toggleFullPageMenu();
          }}
        >
          home
        </button>
        <button
          className="nav-button-full"
          onClick={() => {
            navigate("/calendar")
            toggleFullPageMenu();
          }}
        >
          calendar
        </button>
        <button
          className="nav-button-full"
          onClick={() => {
            navigate("/friends")
            toggleFullPageMenu();
          }}
        >
          friends
        </button>
        <button
          className="nav-button-full"
          onClick={() => {
            dispatch(logoutUser());
            toggleFullPageMenu();
          }}
        >
          logout
        </button>
      </div>
      <div className={state.isLoggedIn ? "nav-button-container" : "hidden"}>
        <button
          className="nav-button"
          onClick={() => {
            navigate("/")
          }}
        >
          home
        </button>
        <button
          className="nav-button"
          onClick={() => {
            navigate("/calendar")
          }}
        >
          calendar
        </button>
        <button
          className="nav-button"
          onClick={() => {
            navigate("/friends")
          }}
        >
          friends
        </button>
        <button
          className="nav-button"
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          logout
        </button>
      </div>
    </nav>
  );
}
