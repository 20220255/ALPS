import React, { useContext, useEffect, useState } from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

function UpdateCustomerPage() {
  console.log('start ng update  customer')
  const { customerPointsData, updateData } = useContext(LoyaltyAppContext);
  // const { customers } = useSelector((state) => state.cust)
  
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    _id: "",
    name: "",
    lastName: "",
    email: "",
    points: 0,
    lastDateVisited: "" || null,
    refId: "",
    createdAt: "",
  });

  const { id } = useParams();

  const handleChange = (e) => {
    if (e.target.id === "points") {
      setFormValues({ ...formValues, [e.target.id]: parseInt(e.target.value) });
    } else {
      setFormValues({ ...formValues, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    const pointsData = customerPointsData.find((item) => item._id === id);
    console.log(pointsData)
    setFormValues(pointsData);
  }, [customerPointsData, id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateCustomer(formValues))
    updateData(formValues)
    navigate("/customer");
  };

  return (
    <Card>
      <div style={{ textAlign: "left", color: "royalblue" }}>
        REF ID: {formValues.refId}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Customer Data Maintenance</h2>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                onChange={handleChange}
                value={formValues.name}
                id="name"
                autoComplete="true"
              />
            </div>
          </div>
        </div>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                onChange={handleChange}
                value={formValues.lastName}
                id="lastName"
                autoComplete="true"
              />
            </div>
          </div>
        </div>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                onChange={handleChange}
                value={formValues.email}
                id="email"
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
                value={formValues.points}
                id="points"
                disabled={true}
              />
              <button
                className="btn-sm btn-primary margin-r-10"
                onClick={handleIncrement}
              >
                -
              </button>
              <button className="btn-sm btn-primary" onClick={handleDecrement}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="lastDateVisited">Date Last Visited: </label>
              {formValues.lastDateVisited === "N.A." ? (
                <input
                  type="text"
                  onChange={handleChange}
                  value={formValues.lastDateVisited}
                  id="lastDateVisited"
                />
              ) : (
                <input
                  type="date"
                  onChange={handleChange}
                  value={formValues.lastDateVisited}
                  id="lastDateVisited"
                />
              )}
            </div>
          </div>
        </div>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="dateCreated">Date Registered: </label>
              <input
                type="text"
                onChange={handleChange}
                value={formValues.createdAt}
                id="dateCreated"
              />
            </div>
          </div>
        </div>
        <Link to={"/customer"}>
          <Button marginRight={5}>Cancel</Button>
        </Link>
        <Button type="submit"> Update </Button>
      </form>
    </Card>
  );
}

export default UpdateCustomerPage;
