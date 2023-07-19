export async function login(username: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const responseParsed = await response.json();
  if (responseParsed.username)
    localStorage.setItem("user", JSON.stringify(responseParsed));
  return responseParsed;
}

export async function checkAuth() {
  const response = await fetch("/api/auth/check-auth", {
    method: "POST",
    credentials: "include",
  });
  const responseParsed = await response.json();
  return responseParsed;
}

export async function createUser(username: string, password: string) {
  console.log("in create user, username and pass are: ", username, password);
  const response = await fetch("/api/auth/create-user", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const responseParsed = await response.json();
  if (responseParsed.username)
    localStorage.setItem("user", JSON.stringify(responseParsed));
  return responseParsed;
}

export async function logout() {
  console.log('first line of logout');
  localStorage.removeItem("user");
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  console.log('i am in logout')
  const responseParsed =  response.json();
  console.log('i have parsed');
  return responseParsed;
}

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("user");
  if (currentUser) return JSON.parse(currentUser);
  return false;
};
const LoginService = {
  createUser,
  login,
  logout,
  getCurrentUser,
};

export default LoginService;