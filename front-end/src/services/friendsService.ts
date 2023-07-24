export async function friendSearch(searchTerm: string) {
  console.log("search term is: ", searchTerm);
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
    console.log("caught error:", responseParsed);
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
  console.log(responseParsed)
  if (response.status >= 400) {
    console.log("caught error:", responseParsed);
    throw new Error("Problems finding friends");
  }

  return responseParsed;
}

export async function addFriendGroup(groupObj: {name: string, friends: string[]}){
  const response = await fetch("/api/friends/add-friend-group", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupObj)
  })
  const responseParsed = await response.json();
  console.log(responseParsed)
  if (response.status >= 400) {
    console.log("caught error:", responseParsed);
    throw new Error("Problems adding friend group");
  }

  return responseParsed;
}
