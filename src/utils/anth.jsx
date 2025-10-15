
export const loginUser = (role) => {
  localStorage.setItem("userRole", role);
};

export const logoutUser = () => {
  localStorage.removeItem("userRole");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

export const isLoggedIn = () => !!localStorage.getItem("userRole");