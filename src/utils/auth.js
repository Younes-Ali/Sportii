export const getUserFromToken = () => {
  const token = localStorage.getItem('authToken');
  return {
    id: 1,
    name: 'John Doe',
    role: 'client', // Change to 'client' to see client dashboard
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
  };
};