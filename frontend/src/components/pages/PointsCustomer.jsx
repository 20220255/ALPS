import React, { useContext, useEffect, useState } from "react";
import PointsContext from "../../context/PointsContext";
import Spinner from "../shared/Spinner";
import { Link, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

function PointsCustomer() {
  const { refId, refID } = useParams();

  const {
    refPoints,
    loading,
    isFreeWashClaimed,
    getPointsByRefId,
    updateClaim,
  } = useContext(PointsContext);

  const { custDetailsRef } = useContext(LoyaltyAppContext);

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

  const [pointsArray, setPointsArray] = useState([{}]);
  const [totalPoints, setTotalPoints] = useState();
  const [claim, setClaim] = useState();
  const [washClaimed, setWashClaimed] = useState();
  const [selectedReferenceDetails, getSelectedReferenceDetails] = useState([{}])

  useEffect(() => {
    getLatestPtsFromRefId();
    freeWashClaimed();
  }, []);

  // get the pts from ref id
  const getLatestPtsFromRefId = async () => {
    const pts = await getPointsByRefId(refId);

    const claimed = await pts[0].claimed
    getSelectedReferenceDetails(claimed)

    const pointsArray = await pts[0].pointsIds;
    setPointsArray(pointsArray);

    // get the total points from the points array
    if (pointsArray.length > 0) {
      const totalPoints = await pointsArray
        .map((obj) => obj.points)
        .reduce((accumulator, current) => accumulator + current, 0);
      setTotalPoints(totalPoints);
    }
  };

  // claim free wash
  const handleClaim = async (washClaimed) => {
    const claimed = {refId, washClaimed};
    await updateClaim(claimed);
    await getSelectedReferenceDetails(!washClaimed);
  };

  // check if free wash has been claimed
  const freeWashClaimed = async () => {
    await setWashClaimed(selectedReferenceDetails)
  };

  if (pointsArray.length < 1) {
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <div>
          <div style={{ float: "left" }} className="ptsRefId">
            Reference ID: {refID}
          </div>
          {userToken && userToken.isAdmin === true && (
            <div className="ptsRefId" style={{ float: "right" }}>
              <Link to={`/points-maintenance/${refID}/${refId}`}>
                <button className="btn-md">Add Points</button>
              </Link>
            </div>
          )}
        </div>
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
          Reference ID: {refID}
        </div>
        {userToken && userToken.isAdmin === true && (
          <div>
            <div className="ptsRefId" style={{ float: "right" }}>
              <Link to={`/points-maintenance/${refID}/${refId}`}>
                <button className="btn-md">Add Points</button>
              </Link>
            </div>
            {totalPoints >= 6 && (
              <div className="ptsRefId" style={{ float: "right" }}>
                <button
                  onClick={ () => handleClaim(selectedReferenceDetails)}
                  className="btn-md"
                  style={{ marginRight: "5px" }}
                >
                  {selectedReferenceDetails ? "UnClaim" : "Claim"}
                </button>
              </div>
            )}
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
                Thank you! Hello
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
            {pointsArray.length > 0 ? (
              pointsArray.map((points, index) => {
                return (
                  <tr key={index}>
                    <td>{points.pointsDate}</td>
                    <td>{points.points}</td>
                    <td>{points.comments}</td>
                    <td>
                      {userToken && userToken.isAdmin === true && (
                        <div className="edit-link">
                          <Link to={`/edit-points/${points._id}/${refId}/${refID}`}>
                            <FaEdit size={18} />
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <h1>hello</h1>
            )}
          </tbody>
        </table>
      )}

      <div style={{ display: "flex", marginTop: "20px", fontSize: "18px" }}>
        <div>Total Points: {totalPoints}</div>
      </div>
      <div style={{ display: "flex", marginTop: "10px", fontSize: "18px" }}>
        {/* Free wash claimed: {isFreeWashClaimed() ? "Yes" : "No"} */}
        Free wash claimed: {selectedReferenceDetails ? "Yes" : "No"}
        {/* Free wash claimed: {claim ? "Yes" : "No"} */}
      </div>
    </div>
  );

  // );
}

export default PointsCustomer;
