import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "./shared/Card";
import PointsCircles from "./PointsCircles";
import PropTypes from "prop-types";
import JSConfetti from "js-confetti";
import { useSelector } from "react-redux";
import LoyaltyAppContext from "../context/LoyaltyAppContext";
import Spinner from "./shared/Spinner";
import { Link } from "react-router-dom";
import PointsContext from "../context/PointsContext";

function Main({ maxPoints = 8 }) {
  useSelector((state) => {
    return state.auth;
  });

  const userToken = JSON.parse(localStorage.getItem("user"));

  const [userLoggedInData, setUserLoggedInData] = useState(userToken);
  const [pointsLeft, setPointsLeft] = useState(0);
  const [initialRender, setinitialRender] = useState(false);
  const [latestRefIdObj, setLatestRefIdObj] = useState({});
  const [claimed, setClaimed] = useState(false);

  const canvasRef = useRef();
  const confettiRef = useRef();

  const { isLoading } = useContext(LoyaltyAppContext);
  const { getPointsByRefId, addReference } = useContext(PointsContext);

  useEffect(() => {
    setUserLoggedInData(userToken);
    getTotalPtsFromLatestRefId();
    setinitialRender(true);
  }, []);

  // get the latest ref id from the logged user
  const getTotalPtsFromLatestRefId = async () => {
    // get the latest Ref ID from the use logged in
    const latestRefIdObj = await userToken.refId.at(-1);
    setLatestRefIdObj(latestRefIdObj);

    // get the points from the latest ref id
    const latestRefId = await getPointsByRefId(latestRefIdObj._id);
    const latestPtsArray = await latestRefId[0].pointsIds;

    // get the total points from the latest ref id
    const totalPoints = await latestPtsArray
      .map((obj) => obj.points)
      .reduce((accumulator, current) => accumulator + current, 0);
    return await totalPoints;
  };

  const checkPointsText = (
    <h3>
      Hi {userLoggedInData.name}, Click or tap the{" "}
      <span style={{ color: "red" }}> Check</span> button below to show your
      points.
    </h3>
  );

  // add another reference id if the free wash for the latest ref id has been claimed
  const handleAddRef = async () => {
    if (claimed) {
      await addReference(userToken._id);
    }
  };

  const completedText = (
    <h3>
      Congratulations, {userLoggedInData.name}! You may claim your next wash for
      free.
    </h3>
  );

  const uncompletedText = (
    <h3>
      Hi {userLoggedInData.name}. You are <span>{String(pointsLeft)}</span>
      {pointsLeft < 2 ? <span> point</span> : <span> points</span>} away from
      getting your free wash.
    </h3>
  );

  const claimedFreeWashText = (
    <>
      <h3>
        Hi {userLoggedInData.name}! This free wash has been claimed. To win
        another free wash, just tap or click the
        <span style={{ color: "red" }}> New Ref ID</span> button to retrieve your
        new Ref ID.
      </h3>
    </>
  );

  const handlePointsClaimed = async (points, claimed) => {
    if (points >= 8) {
      points = 8;
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    for (let index = 1; index <= points; index++) {
      document.querySelector(`#sw00${index}`).style.animation =
        "circle 0.5s ease-in";
      document.querySelector(`#sw00${index}`).style.backgroundColor = "coral";
      document.querySelector(`#sw00${index}`).style.color = "white";
      await sleep(250);
    }

    for (let index = maxPoints; index > points; index--) {
      document.querySelector(`#sw00${index}`).style.backgroundColor =
        "lightgray";
    }

    if (points >= 8 && !claimed) {
      confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
      confettiRef.current.addConfetti({
        confettiRadius: 5,
        confettiNumber: 300,
      });
    }
  };

  const handleClick = async () => {
    // check if free wash has been claimed
    const lastRefIdObj = await getPointsByRefId(latestRefIdObj._id);
    const claimed = await lastRefIdObj[0].claimed;
    setClaimed(claimed);

    setinitialRender(false);
    const totalPts = await getTotalPtsFromLatestRefId();
    setPointsLeft(maxPoints - totalPts);
    await handlePointsClaimed(totalPts, claimed);
  };

  return isLoading ? (
    <Spinner />
  ) : (
      <Card>
        <canvas className="canvas" {...{ ...canvasRef }} />
        {initialRender
          ? checkPointsText
          : pointsLeft <= 0 && claimed
          ? claimedFreeWashText
          : pointsLeft <= 0
          ? completedText
          : uncompletedText}
        <PointsCircles maxPoints={maxPoints} />
        <div>
          <Link to={`/points/${latestRefIdObj._id}/${latestRefIdObj.refId}/${userLoggedInData._id}`}>
            <span style={{ color: "royalblue" }}> {latestRefIdObj.refId} </span>
          </Link>{" "}
          is your Ref ID. Click or tap the Ref ID to show details of your
          points.
        </div>

        <div className="refresh">
          {claimed ? (
            <button className="btn-md-navy-wide" onClick={handleAddRef}>
              New Ref ID
            </button>
          ) : (
            <button className="btn-md-navy-wide" onClick={handleClick}>
              Check
            </button>
          )}
        </div>
      </Card>
  );
}

Main.propTypes = {
  maxPoints: PropTypes.number,
};

export default Main;
