import "../css/utility-css.css";
import "../css/LoginCard.css"
import { useAppDispatch } from "../hooks";
import { updatePassword, updateUsername } from "../reducers/loginReducer"
export default function LoginCard () {
    const dispatch = useAppDispatch();
    return (
        <>
        <div className="login-card">
            <h3 className="login-title">Login</h3>
            <input type="text" className="login-input" placeholder="username" onChange={(e) => {dispatch(updateUsername(e.target.value))}}></input>
            <input type="password" className="login-input" placeholder="password" onChange={(e) => {dispatch(updatePassword(e.target.value))}}></input>
            <button className="button login-button">submit</button>
            <p className="login-link-text">New to catch-up? <a href="/create-user">Signup</a> </p>
        </div>
        </>
    )
}