import "../css/utility-css.css";
import "../css/LoginCard.css";
import {
  createNewUser,
  loginUser,
  updateCofirmPass,
  updatePassword,
  updateUsername,
} from "../reducers/loginReducer";
import { useAppDispatch, useAppSelector } from "../hooks";
export default function CreateUserCard() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  return (
    <>
      <div className="login-card">
        <h3 className="login-title">Create an Account</h3>
        <input
          type="text"
          className="login-input"
          placeholder="username"
          onChange={(e) => {
            dispatch(updateUsername(e.target.value));
          }}
        ></input>
        <input
          type="text"
          className="login-input"
          placeholder="password"
          onChange={(e) => {
            dispatch(updatePassword(e.target.value));
          }}
        ></input>
        <input
          type="text"
          className="login-input"
          placeholder="confirm password"
          onChange={(e) => {
            dispatch(updateCofirmPass(e.target.value));
          }}
        ></input>
        <button
          className="button login-button"
          onClick={() => {
            dispatch(
              createNewUser({
                username: state.username,
                password: state.password,
              })
            );
          }}
        >
          submit
        </button>
      </div>
    </>
  );
}
