import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";
import Spinner from "../shared/Spinner";

function PointsRefCustomer() {

  const { isLoading, custDetailsRef, getCustDetailsRef } =
    useContext(LoyaltyAppContext);

  const { userId } = useParams();

  useEffect(() => {
    const getCustomerDetailsRef = async (userId) => {
      await getCustDetailsRef(userId);
    };
    getCustomerDetailsRef(userId);
  }, [userId]);

  if (!isLoading && (!custDetailsRef || custDetailsRef.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className="ptsRefId">Customer Name: {custDetailsRef.name}</div>
      <table>
        <tbody>
          <tr>
            <th>Reference ID</th>
            <th>Claimed</th>
            <th>Claimed Date</th>
          </tr>
          {custDetailsRef.refIds &&
            custDetailsRef.refIds.map((r, index) => {
              return (
                <tr key={index} className="customer-row">
                  <td>
                    <Link to={`/points/${r._id}/${r.refId}/${custDetailsRef._id}`}>{r.refId}</Link>
                  </td>
                  <td>{r.claimed ? "Yes" : "No"}</td>
                  <td>{r.claimDate}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PointsRefCustomer;
