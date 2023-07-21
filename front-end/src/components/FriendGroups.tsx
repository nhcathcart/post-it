import { useAppDispatch, useAppSelector } from "../hooks";
import {  } from "../reducers/friendsReducer";
import { ModalButton } from "./ModalButton";
import FriendGroupForm from "./FriendGroupForm";

export default function FriendGroup() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const friendGroupsList = state.friendGroups.map((friendGroup) => {
    return (
      <div className="friend-bubble" key={friendGroup.name}>
        <p>{friendGroup.name}</p>
      </div>
    );
  });
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
        <div className="friends-button-container">
          <ModalButton
            isDefault={false}
            cssClass="friend-button"
            text="Create Group"
          >
            <FriendGroupForm />
          </ModalButton>
        </div>
        <h3>Friend Groups</h3>
        {friendGroupsList}
      </div>
    </div>
  );
}
