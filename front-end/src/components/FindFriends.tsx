import "../css/utility-css.css";
import "../css/FriendsPage.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateFriendSearch, friendSearchThunk } from "../reducers/friendsReducer";
import { v4 as uuid,} from 'uuid';


export default function FindFriends() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);
  const searchList = state.findFriendsList.map((username: string) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{username}</p>
      </div>
    );
  });
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
      <h3>Find Friends</h3>
      <input
        type="text"
        placeholder="search"
        className="friend-search-input"
        onChange={(e) => {dispatch(friendSearchThunk(e.target.value))}}
      />
      {searchList}
      </div>
    </div>
  );
}
