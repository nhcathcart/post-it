import "../css/FriendsPage.css";
import "../css/utility-css.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateNewGroup } from "../reducers/friendsReducer";



export default function FriendGroupForm() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.friends)
  

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Group Name"
        className="form-input"
        onChange={(e) => {dispatch(updateNewGroup(e.target.value))}}
      />
      <button className="button" style={{ width: "50%" }} onClick={() => {}}>
        Create Group
      </button>
    </div>
  );
}