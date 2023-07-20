import { useAppDispatch, useAppSelector } from "../hooks";
import { filterViewableFriendGroups } from "../reducers/friendsReducer";

export default function FriendGroup() {

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const friendGroupsList = state.viewableFriendGroups.map((friendGroup) => {
    return (
      <div className="friend-bubble" key={friendGroup}>
        <p>{friendGroup}</p>
      </div>
    );
  });
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
      <h3>Friend Groups</h3>
      <input
        type="text"
        placeholder="search"
        className="friend-search-input"
        onChange={(e) => dispatch(filterViewableFriendGroups(e.target.value))}
      />
      {friendGroupsList}
      </div>
    </div>
  );
}
