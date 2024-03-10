import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../shared/Card";
import { logout, reset } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";

function GetReferenceId() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Card>
      <div className="about">
        <h1>Login in again to get your new Reference ID</h1>

        <button className="btn-md" onClick={onLogout}>
          <span style={{ color: "navy" }}>
            <FaSignOutAlt /> Logout
          </span>
        </button>
      </div>
    </Card>
  );
}

export default GetReferenceId;
