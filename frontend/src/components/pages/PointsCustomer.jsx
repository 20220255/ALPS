import React, { useContext, useEffect, useState } from "react";
import PointsContext from "../../context/PointsContext";
import Spinner from "../shared/Spinner";
import { Link, useParams } from "react-router-dom";
import Button from "../shared/Button";
import { FaEdit } from "react-icons/fa";

function PointsCustomer() {
  const {
    refPoints,
    getPtsListByRef,
    loading,
    getTotalPointsbyRefId,
    isFreeWashClaimed,
    totalPoints,
  } = useContext(PointsContext);

  const { refId } = useParams();

  const userToken = JSON.parse(localStorage.getItem("user"));

  const [formValues, setFormValues] = useState({
    _id: "",
    refId: "",
    pointsDate: "",
    claimed: "",
    points: 0,
    comments: "",
    userId: "",
  });

  useEffect(() => {
    getPtsListByRef(refId);

    const refPointsData = refPoints.find((item) => item._id === refId);
    setFormValues(refPointsData);

  }, [getPtsListByRef, refId, refPoints]);

  if (!loading && (!refPoints || refPoints.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (refPoints.length < 1 && refPoints[0].pointsDate === "") {
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <table>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "center" }}>
                <p style={{ fontSize: "35px" }}>No points to show yet.</p>{" "}
                <br></br>
                Visit our shop and avail our laundry services to earn points.
                Thank you!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div>
        <div style={{ float: "left" }} className="ptsRefId">
          Reference ID: {refPoints[0].refId}
        </div>
        {userToken && userToken.isAdmin === true && (
          <div className="ptsRefId" style={{ float: "right" }}>
            <Link to={`/points-maintenance/${refId}`}>
              <button className="btn-md">Add Points</button>
            </Link>
          </div>
        )}
      </div>

      {refPoints.length < 1 && refPoints[0].pointsDate === "" ? (
        <table>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "center" }}>
                <p style={{ fontSize: "35px" }}>No points to show yet.</p>{" "}
                <br></br>
                Visit our shop and avail our laundry services to earn points.
                Thank you!
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
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
                  <td>
                    <div className="edit-link">
                      <Link to={`/edit-points/${refPoint._id}`}>
                        <FaEdit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={{ display: "flex", marginTop: "20px", fontSize: "18px" }}>
        <div>Total Points: {totalPoints}</div>
      </div>
      <div style={{ display: "flex", marginTop: "10px", fontSize: "18px" }}>
        Free wash claimed: {isFreeWashClaimed() ? "Yes" : "No"}
      </div>
    </div>
  );
}

export default PointsCustomer;
