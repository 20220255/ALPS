import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [refPoints, setRefPoints] = useState([{}]);
  const navigate = useNavigate();
  const API_URL = "/api/points/";
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const getPtsListByRef = async (refId) => {
    try {
      const response = await axios.get(API_URL + refId, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      const data = await response.data;
      setRefPoints(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      navigate("/main");
    }
  };

  const getTotalPointsbyRefId = () => {
    const totalPoints = refPoints.reduce((accumulator, object) => {
      return accumulator + object.points;
    }, 0);
    return totalPoints;
  };

  const isFreeWashClaimed = () => {
    const isClaimed = refPoints.find((points) => {
      return points.washClaimed === true;
    });
    return isClaimed;
  };

  return (
    <PointsContext.Provider
      value={{
        getPtsListByRef,
        getTotalPointsbyRefId,
        isFreeWashClaimed,
        refPoints,
        loading,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};

PointsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PointsContext;
