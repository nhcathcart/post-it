import { useAppDispatch, useAppSelector } from "../hooks";
import {
  filterViewableFriendGroups,
  filterViewableFriends,
} from "../reducers/friendsReducer";

export default function FriendsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const friendsList = state.viewableFriends.map((friend) => {
    return (
      <div className="friend-bubble" key={friend}>
        <p>{friend}</p>
      </div>
    );
  });
  
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
        <h3>Friends</h3>
        <input
          type="text"
          placeholder="search"
          className="friend-search-input"
          onChange={(e) => dispatch(filterViewableFriends(e.target.value))}
        />
        {friendsList}
      </div>
      
    </div>
  );
}
