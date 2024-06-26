import React, { useContext, useEffect, useState } from "react";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";
import PointsContext from "../../context/PointsContext";

function UpdateCustomerPage() {
  const { customerPointsData, updateData } = useContext(LoyaltyAppContext);
  const { getOverallPts, overallCustPts } = useContext(PointsContext);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    _id: "",
    name: "",
    lastName: "",
    email: "",
    points: 0,
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
    setFormValues(pointsData);
    getOverallPts(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formValues);
    navigate("/customer");
  };

  return (
    <Card>
      <div style={{ textAlign: "left", color: "royalblue" }}></div>
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
                style={{ width: "500px" }}
              />
            </div>
          </div>
        </div>
        <div className="padding-b-12">
          <div className="input-group">
            <div>
              <label htmlFor="points">
                Total Points Overall: {overallCustPts}{" "}
              </label>
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
        <Link to={`/refId/${formValues._id}`}>
          <Button marginRight={5}>Points</Button>
        </Link>
        <Link to={"/customer"}>
          <Button marginRight={5}>Cancel</Button>
        </Link>
        <Button type="submit"> Update </Button>
      </form>
    </Card>
  );
}

export default UpdateCustomerPage;
