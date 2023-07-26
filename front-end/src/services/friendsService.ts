export async function friendSearch(searchTerm: string) {
  const response = await fetch("/api/friends/search", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm: searchTerm }),
  });
  const responseParsed = await response.json();

  if (response.status >= 400) {
    // Handle server errors here (e.g., throw an error)
    throw new Error("Problems finding friends");
  }

  return responseParsed;
}
export async function friendSearchAll(searchTerm: string) {
  const response = await fetch("/api/friends/search-all", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm: searchTerm }),
  });
  const responseParsed = await response.json();

  if (response.status >= 400) {
    // Handle server errors here (e.g., throw an error)
    throw new Error("Problems finding friends");
  }

  return responseParsed;
}
export async function addFriend(username: string) {
  const response = await fetch("/api/friends/add-friend", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ friend: username }),
  });
  const responseParsed = await response.json();
  return responseParsed;
}

export async function acceptFriend(username: string) {
  const response = await fetch("/api/friends/accept-friend-request", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ friend: username }),
  });

  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems accepting friend request");
  }
  return responseParsed;
}

export async function loadFriends() {
  const response = await fetch("/api/friends/get-friends", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems accepting friend request");
  }
  return responseParsed;
}
export async function loadPendingFriends() {
  const response = await fetch("/api/friends/get-pending-friends", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems finding friends");
  }

  return responseParsed;
}
export async function loadSentFriendRequests(){
  const response = await fetch("/api/friends/get-sent-friend-requests", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const responseParsed = await response.json();
  console.log(responseParsed)
  if (response.status >= 400){
    throw new Error("Problems loading sent requests")
  }
  return responseParsed;
}
export async function addFriendGroup(groupObj: {
  name: string;
  friends: string[];
}) {
  const response = await fetch("/api/friends/add-friend-group", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupObj),
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems adding friend group");
  }

  return responseParsed;
}

export async function getFriendGroups() {
  const response = await fetch("/api/friends/get-friend-groups", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems getting friend groups");
  }
  return responseParsed;
}

export async function removeFriendFromGroup(groupObj: {
  name: string;
  friendToRemove: string;
}) {
  const response = await fetch("/api/friends/remove-friend-from-group", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupObj),
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems getting friend groups");
  }
  return responseParsed;
}

export async function deleteFriendGroup(groupName: string) {
  const response = await fetch("/api/friends/delete-friend-group", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ groupName: groupName }),
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems deleteing friend group");
  }
  return responseParsed
}
