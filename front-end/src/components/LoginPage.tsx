import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <LoginCard />
      </div>
    </div>
  );
}
