import "../css/utility-css.css";
import "../css/LoginCard.css"
export default function LoginCard () {
    return (
        <>
        <div className="login-card">
            <h3 className="login-title">Login</h3>
            <input type="text" className="login-input" placeholder="username"></input>
            <input type="password" className="login-input" placeholder="password"></input>
            <button className="button login-button">submit</button>
            <p className="login-link-text">New to catch-up? <a href="/create-user">Signup</a> </p>
        </div>
        </>
    )
}