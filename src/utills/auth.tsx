// src/utils/auth.ts
export const isLoggedIn = () => {
  return !!localStorage.getItem("authToken");
};

export const logout = () => {
  localStorage.removeItem("authToken");
};
