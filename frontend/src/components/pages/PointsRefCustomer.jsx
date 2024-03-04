import React, { useContext, useEffect } from "react";
import PointsContext from "../../context/PointsContext";
import { Link, useParams } from "react-router-dom";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";
import Spinner from "../shared/Spinner";

function PointsRefCustomer() {
  const { userRefData, getRefListByUserId, loading, refList } =
    useContext(PointsContext);
  const { getCustDetails, custDetails, isLoading } =
    useContext(LoyaltyAppContext);
  const { userId } = useParams();
  //   const [refId, setRefId] = useState([]);

  useEffect(() => {
    getCustDetails(userId);
    getRefListByUserId(userId);
  }, []);

  if (!isLoading && (!custDetails || custDetails.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (!loading && (!userRefData || userRefData.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return isLoading || loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="ptsRefId">Customer Name: {custDetails.name}</div>
      <table>
        <tbody>
          <tr>
            <th>Reference ID</th>
          </tr>
          {refList.map((r, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/points/${r}`}>{r}</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PointsRefCustomer;
