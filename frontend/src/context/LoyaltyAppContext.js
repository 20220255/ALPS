import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoyaltyAppContext = createContext();

export const LoyaltyAppProvider = ({ children }) => {
  const [custDetails, setCustDetails] = useState({});
  const [customerPointsData, setCustomerPointsData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({ text: "", status: "" });
  const [custDetailsRef, setCustDetailsRef] = useState([{}]);
  const navigate = useNavigate();

  const { user } = useSelector((state) => {
    return state.auth;
  });

  const API_URL = "/api/users/";

  const userLocal = JSON.parse(localStorage.getItem("user"));

  // Get all the customer data
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(API_URL + "customers/", {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      const data = await response.data;
      setCustomerPointsData(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      toast.error(error);

      setIsLoading(false);

      navigate("/main");
    }
  };

  // Get a customer's data
  // no need to pass an argument here since you can get the user's id from useSeletor hook of redux
  const getCustDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL + `/customer-details/${id}`);
      const data = await response.data;
      // get the customer details
      setCustDetails(data);
      setIsLoading(false);
      // return data
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);

      navigate("/main");
    }
  };

  // Get customer's detail including ref id details
  const getCustDetailsRef = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL + `/customer-details-ref/${id}`);
      const data = await response.data;
      setIsLoading(false);
      await setCustDetailsRef(data);
      // return custDetailsRef
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
      navigate("/main");
    }
  };

  // update customer data
  const updateData = async (updatedData) => {
    setIsLoading(true);

    try {
      await axios.put(API_URL + "update", updatedData);

      setCustDetails({ ...custDetails, ...updatedData });

      setIsLoading(false);

      toast.success("Data updated successfully.");
    } catch (error) {
      toast.error("Error on updating data!");
      setIsLoading(false);
    }
  };

  return (
    <LoyaltyAppContext.Provider
      value={{
        custDetails,
        customerPointsData,
        isLoading,
        custDetailsRef,
        setIsLoading,
        updateData,
        getCustDetails,
        fetchData,
        getCustDetailsRef,
        errMsg,
      }}
    >
      {children}
    </LoyaltyAppContext.Provider>
  );
};

LoyaltyAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoyaltyAppContext;
