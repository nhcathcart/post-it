import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import CreateUserCard from "./CreateUserCard";

export default function CreateUserPage () {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <CreateUserCard/>
      </div>
    </div>
  );
}