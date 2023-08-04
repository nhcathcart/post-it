import { useAppDispatch, useAppSelector } from "../hooks";
import {  } from "../reducers/friendsReducer";
import { ModalButton } from "./ModalButton";
import FriendGroupForm from "./FriendGroupForm";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { getFriendGroupsThunk } from "../reducers/friendsReducer"
import { FriendGroupBubble } from "./FriendGroupBubble";
import "../css/FriendGroups.css"

export default function FriendGroup() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);
  const friendGroupsList = state.friendGroups.map((friendGroup) => {
    return (
      <FriendGroupBubble key={uuid()} title={friendGroup.name} children={friendGroup.friends}/>
    );
  });

  useEffect(()=> {
    dispatch(getFriendGroupsThunk())
  }, [])
  return (
      <div className="friend-group-list-container">
        <div className="right-align-button-container">
          <ModalButton
            isDefault={false}
            cssClass="friend-button"
            text="Create Group"
          >
            {/* onClose function is provided in the Modal component */}
            <FriendGroupForm onClose={()=>{}} /> 
          </ModalButton>
        </div>
        <h3>Friend Groups</h3>
        {friendGroupsList}
      </div>
  );
}
