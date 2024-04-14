import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../shared/Card";
import PointsContext from "../../context/PointsContext";
import Button from "../shared/Button";

function EditPointsPage() {

  
  const { updatePoints, deletePoints = {}, getPoints } = useContext(PointsContext);
  
  const { _id, refId, refID, userId } = useParams();

  // const [formValues, setFormValues] = useState({ pointsData  });
  const [formValues, setFormValues] = useState({

    _id,
    pointsDate: "",
    points: 0,
    comments: "",
    createdAt: "",
  });

  const { pointsDate, points, comments } = formValues;

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // find the points from the points table using the id parameter
    const getPts = async (_id) => {
      const ptsObj = await getPoints(_id)
      await setFormValues(ptsObj)
    }

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

  const handleSubmit = async(e) => {
    await e.preventDefault();
    await updatePoints(formValues)
    navigate(`/points/${refId}/${refID}/${userId}`)
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

  const handleDelete = async() => {
    const isConfirmed = window.confirm("Are you sure you want to delete the point?")
    const deleteParams = {pointsId: formValues._id, refId }
    if (isConfirmed) {
        await deletePoints(deleteParams)
    }
    navigate(`/points/${refId}/${refID}/${userId}`)
  }

  return (
    <div>
      <Card>
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
