export async function friendSearch(searchTerm: string) {
  console.log("search term is: ", searchTerm)
  const response = await fetch("/api/friends/search", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({searchTerm: searchTerm}),
  });
  const responseParsed = await response.json();

  if (response.status >= 400) {
    // Handle server errors here (e.g., throw an error)
    console.log('caught error:', responseParsed);
    throw new Error("Problems finding friends");
  }

  return responseParsed;
}
export async function addFriend(username: string){
    const response = await fetch("/api/friends/add-friend", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(username),
    });
    const responseParsed = await response.json()
    return responseParsed;
}
export async function loadFriends(){
    const response = await fetch("/api/friends/get-friends", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
        },
    })
    const responseParsed = await response.json();
    return responseParsed
}
