import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../shared/Card";
import PointsContext from "../../context/PointsContext";
import Button from "../shared/Button";

function EditPointsPage() {
  const { updatePoints, refPoints, deletePoints = {}, getPoints } = useContext(PointsContext);
  
  const { _id, refId } = useParams();

  // const [formValues, setFormValues] = useState({ pointsData  });
  const [formValues, setFormValues] = useState({

    _id,
    // refId: "",
    pointsDate: "",
    points: 0,
    // userId: "",
    // claimed: false,
    comments: "",
    createdAt: "",
  });

  
  const { pointsDate, points, comments } = formValues;

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();


  const getPts = async (_id) => {
    const ptsObj = await getPoints(_id)
    setFormValues(ptsObj)
  }


  useEffect(() => {
    // find the points from the points table using the id parameter
    getPts(_id)
  }, [_id]);
  
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
    navigate(`/points/${refId}`)
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
    navigate(`/points/${refId}`)
  }

  return (
    <div>
      <Card>
        {/* <div style={{ textAlign: "left", color: "royalblue" }}>
          REF ID: 'refId'
        </div> */}
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
          {/* <div className="padding-b-12">
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
          </div> */}
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
