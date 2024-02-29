import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "./shared/Card";
import PointsCircles from "./PointsCircles";
import PropTypes from "prop-types";
import DateFormat from "./shared/DateFormat";
import JSConfetti from "js-confetti";
import { useSelector } from "react-redux";
import LoyaltyAppContext from "../context/LoyaltyAppContext";
import Spinner from "./shared/Spinner";
import { Link } from "react-router-dom";

function Main({ maxPoints = 6 }) {
  useSelector((state) => {
    return state.auth;
  });

  const userToken = JSON.parse(localStorage.getItem("user"));

  const [pointsLeft, setPointsLeft] = useState(0);
  const [initialRender, setinitialRender] = useState(false);

  // const dispatch = useDispatch();

  const canvasRef = useRef();
  const confettiRef = useRef();

  const { getCustDetails, custDetails, isLoading } =
    useContext(LoyaltyAppContext);

  const checkPointsText = (
    <h3>Hi {custDetails.name}, Click Check button to show your points.</h3>
  );

  const completedText = (
    <h3>
      Congratulations, {custDetails.name}! You may claim your free wash on your
      next visit.
    </h3>
  );

  const uncompletedText = (
    <h3>
      Hi {custDetails.name}. You are <span>{String(pointsLeft)}</span>
      {pointsLeft < 2 ? <span> point</span> : <span> points</span>} away from
      getting your free wash.
    </h3>
  );

  useEffect(() => {
    // dispatch(refresh(userLocal._id));

    getCustDetails(userToken._id);

    setinitialRender(true);

    // dispatch(getAllCustomers())
  }, []);

  const handlePointsClaimed = (points) => {
    if (points >= 6) {
      points = 6;
    }

    for (let index = 1; index <= points; index++) {
      document.querySelector(`#sw00${index}`).style.backgroundColor =
        "lightblue";
    }
    for (let index = maxPoints; index > points; index--) {
      document.querySelector(`#sw00${index}`).style.backgroundColor =
        "lightgray";
    }

    if (points >= 6) {
      confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
      confettiRef.current.addConfetti({
        confettiRadius: 5,
        confettiNumber: 300,
      });
    }
  };

  const handleClick = async () => {
    if (custDetails.points > maxPoints) {
      custDetails.points = maxPoints;
    }
    setPointsLeft(maxPoints - custDetails.points);
    handlePointsClaimed(custDetails.points);
    setinitialRender(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Card>
        <canvas className="canvas" {...{ ...canvasRef }} />
        {initialRender
          ? checkPointsText
          : pointsLeft === 0
          ? completedText
          : uncompletedText}
        <PointsCircles maxPoints={maxPoints} />
        <DateFormat date={custDetails.lastDateVisited} />
        Your Ref ID is{" "}
        <span style={{ color: "royalblue" }}>
          <Link to={`/points/${custDetails.refId}`}>{custDetails.refId}</Link>
        </span>
        . Please show the Ref ID and a valid ID to the storekeeper when claiming
        your point.
        <div className="refresh">
          <button className="btn-md-navy" onClick={handleClick}>
            Check
          </button>
        </div>
      </Card>
    </div>
  );
}

Main.propTypes = {
  maxPoints: PropTypes.number,
};

export default Main;
