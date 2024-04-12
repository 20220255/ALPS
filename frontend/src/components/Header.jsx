import PropTypes from "prop-types";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useContext } from "react";
import LoyaltyAppContext from "../context/LoyaltyAppContext";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { fetchData } = useContext(LoyaltyAppContext);

  // console.log(userToken)

  const handleClick = () => {
    // dispatch(getAllCustomers())
    fetchData();
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header
        className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          flexWrap: "nowrap",
          marginBottom: "10px",
          marginRight: "10px",
          // paddingRight: ""
        }}
      >
      <div>{false}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginLeft: "10px",
          }}
        >
          <div>
            {userToken && (
              <h2>
                {userToken ? (
                  <span style={{ textAlign: "left" }}>
                    <Link style={{ marginLeft: "10px" }} to="/main">
                      Points
                    </Link>
                  </span>
                ) : (
                  <Link to="/">Points</Link>
                )}
              </h2>
            )}
          </div>
          <div>
            {userToken && userToken.isAdmin === true && (
              <h2 onClick={handleClick}>
                <Link to="/customer" style={{ marginLeft: "10px" }}>
                  <span>Customer</span>
                </Link>
              </h2>
            )}
          </div>
        </div>
        <div style={{ width: "100px" }}></div>
        <div style={{ justifyContent: "flex-end" }}>
          <ul>
            {userToken ? (
              <li>
                <button className="btn-md" style={{marginRight: "10px"}}  onClick={onLogout}>
                  <span style={{ color: "navy"}}>
                    <FaSignOutAlt /> Logout
                  </span>
                </button>
              </li>
            ) : (
              <div style={{ marginRight: "30px" }}>
                <ul>
                  <div>
                    <li>
                      <Link to="/login">
                        <FaSignInAlt /> Login
                      </Link>
                    </li>
                  </div>
                  <div>
                    <li>
                      <Link to="/register">
                        <FaUser /> Register
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </header>

      <hr
        style={{
          height: "2px",
          color: "white",
          backgroundColor: "white",
          marginBottom: "40px"
        }}
      />
    </>
  );
}

Header.propTypes = {
  headerTitle: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
