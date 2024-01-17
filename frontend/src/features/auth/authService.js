import axios from "axios";

const API_URL = "/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  console.log('user dat: ' + userData)
  
  const response = await axios.post(API_URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// // Get all customers
// const getAllCustomers = async () => {
//   const userLocal = JSON.parse(localStorage.getItem("user"));
//   const response = await axios.get(API_URL + '/customers', {
//     headers: { Authorization: `Bearer ${userLocal.token}` },
//   });
//   return response.data;
// };

// Logout
const logout = () => localStorage.removeItem("user");

// refresh a customer's details
const refresh = async (userId) => {
  const response = await axios.get(API_URL + `/customer-details/${userId}`);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  refresh,
  // getAllCustomers,
};

export default authService;
