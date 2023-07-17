import "../css/utility-css.css";
import "../css/LoginCard.css"
export default function CreateUserCard () {
    return (
        <>
        <div className="login-card">
            <h3 className="login-title">Create an Account</h3>
            <input type="text" className="login-input" placeholder="username"></input>
            <input type="text" className="login-input" placeholder="password"></input>
            <input type="text" className="login-input" placeholder="confirm password"></input>
            <button className="button login-button">submit</button>
        </div>
        </>
    )
}