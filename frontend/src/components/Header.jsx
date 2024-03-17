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
    fetchData()
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header
      className="header"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "flex-end",
          marginRight: "300px",
        }}
      >
        <div>
          {userToken && (
            <div>
              <h2>
                {userToken ? (
                  <Link to="/main">
                    <span>Loyalty Points</span>
                  </Link>
                ) : (
                  <Link to="/">Loyalty Points</Link>
                )}
              </h2>
            </div>
          )}
        </div>
        <div>
          {userToken && userToken.isAdmin === true && (
            <div style={{ paddingRight: "-5px", marginRight: "-300px" }}>
              <h2 onClick={handleClick}>
                <Link to="/customer">
                  <span>Customer Updates</span>
                </Link>
              </h2>
            </div>
          )}
        </div>
      </div>

      <ul>
        {userToken ? (
          <li>
            <button className="btn-md" onClick={onLogout}>
              <span style={{ color: "navy" }}>
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
    </header>
  );
}

Header.propTypes = {
  headerTitle: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
