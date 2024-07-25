export const isLogged = () => {
  return sessionStorage.getItem('user');
};

export const logout = () => {
  sessionStorage.removeItem('user');
  window.location = '/login';
};
