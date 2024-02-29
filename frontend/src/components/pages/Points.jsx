import React, { useContext, useEffect } from "react";
import PointsContext from "../../context/Points";
import Spinner from "../shared/Spinner";
import { useParams } from "react-router-dom";

function Points() {
  const {
    refPoints,
    getPtsListByRef,
    loading,
    getTotalPointsbyRefId,
    isFreeWashClaimed,
  } = useContext(PointsContext);

  const {refId} = useParams()

  useEffect(() => {
    getPtsListByRef(refId);
  }, [getPtsListByRef, refId]);

  const totalPoints = getTotalPointsbyRefId();

  if (!loading && (!refPoints || refPoints.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="ptsRefId">Reference ID: {refPoints[0].refId}</div>

      <table>
        <tbody>
          <tr>
            <th>Date Points Received</th>
            <th>Points</th>
            <th>Comments</th>
          </tr>
          {refPoints.map((refPoint, index) => {
            return (
              <tr key={index}>
                <td>{refPoint.pointsDate}</td>
                <td>{refPoint.points}</td>
                <td>{refPoint.comments}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: "flex", marginTop: "20px", fontSize: "18px" }}>
        Total Points: {totalPoints}
      </div>
      <div style={{ display: "flex", marginTop: "10px", fontSize: "18px" }}>
        Free wash claimed: {isFreeWashClaimed() ? 'Yes' : 'No'}
      </div>
    </div>
  );
}

export default Points;
