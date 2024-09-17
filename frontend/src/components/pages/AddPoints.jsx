import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../shared/Card";
import PointsContext from "../../context/PointsContext";
import Button from "../shared/Button";
import { toast } from "react-toastify";

function AddPoints() {

  const { addPointsByRefId, getPointsByRefId } = useContext(PointsContext);
  const [formValues, setFormValues] = useState({
    refId: "",
    pointsDate: "",
    points: 0,
    userId: "",
    claimed: false,
    comments: "",
  });

  const { pointsDate, points, comments } = formValues;

  const { refID, refId, userId } = useParams();

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    if (e.target.id === "points") {
      setFormValues({ ...formValues, [e.target.id]: parseInt(e.target.value) });
    } else if (e.target.id === "claimed") {
      setFormValues({ ...formValues, [e.target.id]: e.target.checked });
      setIsChecked(!isChecked);
    } else {
      setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }
  };

  // get the pts from ref id
  const getLatestPtsFromRefId = async () => {
    const pts = await getPointsByRefId(refId);
    const pointsArray = await pts[0].pointsIds;
    if (pointsArray.length > 0) {
      const totalPoints = await pointsArray
        .map((obj) => obj.points)
        .reduce((accumulator, current) => accumulator + current, 0);
      return totalPoints + formValues.points;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pointsData = {
      userId,
      refId: refId,
      pointsDate,
      points,
      comments,
    };
    // Check if total pts per ref id is more than 6 pts
    const totalPts = await getLatestPtsFromRefId();
    if (totalPts > 6) {
      navigate(-1)
      toast.error("Total points per Ref ID should not exceed 6 pts.");
    } else {
      addPointsByRefId(pointsData);
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.target.id = "points";
    setFormValues({ ...formValues, [e.target.id]: formValues.points - 1 });
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.target.id = "points";
    setFormValues({ ...formValues, [e.target.id]: formValues.points + 1 });
  };

  return (
    <div>
      <Card>
        <div style={{ textAlign: "left", color: "royalblue" }}>
          REF ID: {refID}
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Add Points</h2>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="pointsDate">Date Visited: </label>
                <input
                  type="date"
                  onChange={handleChange}
                  value={formValues.pointsDate}
                  id="pointsDate"
                  autoComplete="true"
                  required
                />
              </div>
            </div>
          </div>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="points">Points: </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formValues.points}
                  id="points"
                  placeholder="0"
                  disabled={true}
                />
                <button
                  className="btn-sm btn-primary margin-r-10"
                  onClick={handleIncrement}
                >
                  -
                </button>
                <button
                  className="btn-sm btn-primary"
                  onClick={handleDecrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="comments">Comments: </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formValues.comments}
                  id="comments"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            style={{ marginRight: "5px" }}
            className="btn btn-primary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <Button type="submit"> Add </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddPoints;
