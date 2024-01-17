import axios from "axios";

const API_URL = "/api/users";
const userLocal = JSON.parse(localStorage.getItem("user"));

// Get all customers
const getAllCustomers = async () => {
  console.log('get all cust before axios')
  const response = await axios.get(API_URL + "/customers", {
    headers: { Authorization: `Bearer ${userLocal.token}` },
  });
  console.log(response)
  // const response = await axios.get(API_URL + "/customers", {
  //   headers: { Authorization: `Bearer ${userLocal.token}` },
  // });
  return response.data;
};

// Get update customer
const updateCustomer = async (updatedData) => {
  const response = await axios.put(API_URL + `/update`, updatedData, {
    headers: { Authorization: `Bearer ${userLocal.token}` },
  });
  return response.data;
};

const custService = {
  getAllCustomers,
  updateCustomer,
};

export default custService;
