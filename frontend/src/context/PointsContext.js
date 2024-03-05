import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [refPoints, setRefPoints] = useState([{}]);
  const [userRefData, setUserRefData] = useState([{}]);
  const [latestRefIdObj, setLatestRefIdObj] = useState({});
  const [latestRefIdObjs, setLatestRefIdObjs] = useState({});
  const [totalPoints, setTotalPoints] = useState();
  const [pointsData, setPointsData] = useState({})

  const [refList, setRefList] = useState([]);
  const navigate = useNavigate();
  const API_URL = "/api/points/";
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [latestRef] = useState({});

  // Get the Points list by reference ID
  const getPtsListByRef = async (refId) => {
    try {
      // setLoading(true)
      const response = await axios.get(API_URL + refId, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      const data = await response.data;
      setRefPoints(data);

      // get the ref objs with the specified ref id
      const latestRefIdObjs = await data.filter(
        (refIds) => refIds.refId === refId
      );

      // get the total points
      const totalPoints = await latestRefIdObjs.reduce(
        (accumulator, object) => {
          return accumulator + object.points;
        },
        0
      );
      setTotalPoints(totalPoints);

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      navigate("/main");
    }
  };

  // update points data
  const updatePoints = async (updatedPoints) => {
    setLoading(true);
    
    try {
      await axios.put(API_URL + "update-points", updatedPoints);

      setPointsData({ ...refPoints, ...updatedPoints });

      setLoading(false);

      toast.success("Data updated successfully.");
    } catch (error) {
      toast.error("Error on updating data!");
      setLoading(false);
    }
  };


  // check free wash was claimed by reference id
  const isFreeWashClaimed = () => {
    const isClaimed = refPoints.find((points) => {
      return points.claimed === true;
    });
    return isClaimed;
  };

  // Add points to customer
  const addPoints = async (pointsData) => {
    try {
      const response = await axios.post(API_URL + "addPoints", pointsData, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      toast.success("Points updated successfully.");
      navigate(`/points/${response.data.refId}`);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      navigate("/main");
    }
  };

  // Get all reference id records by user ID (set to userRefData)
  const getRefListByUserId = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "user/" + userId, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      const data = await response.data;
      setUserRefData(data);

      // get distinct Ref IDs
      const refList = [...new Set(data.map((item) => item.refId))];
      setRefList(refList);

      // get the latest ref id obj
      const latestRefIdObj = await data.reduce((a, b) =>
        a.createdAt > b.createdAt ? a : b
      );
      setLatestRefIdObj(latestRefIdObj);

      // get the the reference objects by ref id using latest ref id
      const latestRefIdObjs = await data.filter(
        (refIds) => refIds.refId === latestRefIdObj.refId
      );
      setLatestRefIdObjs(latestRefIdObjs);

      // get the total points from the latest ref id objects
      const totalPoints = await latestRefIdObjs.reduce(
        (accumulator, object) => {
          return accumulator + object.points;
        },
        0
      );
      setTotalPoints(totalPoints);

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      navigate("/main");
    }
  };

  // Get the latest ref date in the Points table (userRefData state)
  const getLatestRefId = () => {
    return userRefData.reduce((a, b) => (a.createdAt > b.createdAt ? a : b));
  };

  // Get Points object from Points table
  const getPoints = async (_id) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL + "point/" + _id, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      const data = await response.data
      setPointsData(data)
      return await data
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      navigate("/main");
    }
  };

  return (
    <PointsContext.Provider
      value={{
        getPtsListByRef,
        isFreeWashClaimed,
        addPoints,
        getRefListByUserId,
        getLatestRefId,
        getPoints,
        updatePoints,
        refPoints,
        loading,
        userRefData,
        refList,
        latestRef,
        latestRefIdObj,
        latestRefIdObjs,
        totalPoints,
        pointsData
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
