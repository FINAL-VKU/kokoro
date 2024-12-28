export const STORAGE = {
  JWT: "clbJWT",
  USER: "user",
  token: "token"
};

export function getItem(key) {
  return localStorage.getItem(key);
}

export function setItem(key, value) {
  return localStorage.setItem(key, value);
}

