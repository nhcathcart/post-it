export async function login(username: string, password: string) {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  const responseParsed = await response.json();
  if (responseParsed.data.username)
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
  const response = await fetch("/api/auth/create-user", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  const responseParsed = await response.json();
  if (responseParsed.data.username)
    localStorage.setItem("user", JSON.stringify(responseParsed));
  return responseParsed;
}

export async function logout() {
  localStorage.removeItem("user");
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  return response;
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

export default LoginService
