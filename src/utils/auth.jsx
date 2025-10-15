

// نخزن نوع المستخدم (عميل أو مقدم خدمة)
export const setUserRole = (role) => {
  localStorage.setItem("userRole", role);
};

// نجيب نوع المستخدم الحالي
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// تسجيل خروج
export const logout = () => {
  localStorage.removeItem("userRole");
};

