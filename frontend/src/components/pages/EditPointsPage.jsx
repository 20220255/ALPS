import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../shared/Card";
import PointsContext from "../../context/PointsContext";
import Button from "../shared/Button";

function EditPointsPage() {
  const { updatePoints, refPoints, deletePoints = {} } = useContext(PointsContext);
  
  const { _id } = useParams();

  // const [formValues, setFormValues] = useState({ pointsData  });
  const [formValues, setFormValues] = useState({
    _id,
    refId: "",
    pointsDate: "",
    points: 0,
    userId: "",
    claimed: false,
    comments: "",
    createdAt: "",
  });

  
  
  const { refId, pointsDate, points, claimed, comments } = formValues;

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    // getPoints(_id);
    const pointsData = refPoints.find((item) => item._id === _id);
    setFormValues(pointsData);  
  }, [_id, refPoints]);
  

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePoints(formValues)
    navigate(`/points/${formValues.refId}`)
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

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete the point?")
    if (isConfirmed) {
        deletePoints(formValues._id)
    }
    navigate(`/points/${formValues.refId}`)
  }

  return (
    <div>
      <Card>
        <div style={{ textAlign: "left", color: "royalblue" }}>
          REF ID: {refId}
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Update Points</h2>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="pointsDate">Date Visited: </label>
                <input
                  type="date"
                  onChange={handleChange}
                  value={pointsDate}
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
                <label htmlFor="claimed">Wash Claimed: </label>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  checked={claimed}
                  value={claimed}
                  id="claimed"
                  autoComplete="true"
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
                  value={points}
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
                  value={comments}
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
          <Button type="submit" marginRight={5}> Update </Button>
          <button type="button" onClick={handleDelete} style={{marginRight: "5px"}} className="btn btn-secondary">Delete</button>          
        </form>
      </Card>
    </div>
  );
}

export default EditPointsPage;
