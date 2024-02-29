import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../shared/Spinner";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

function CustomerPage() {
  // const dispatch = useDispatch()
  // const {customers, isLoading, message} = useSelector((state) => state.cust)

  const [search, setSearch] = useState("");

  const { fetchData, customerPointsData, isLoading } =
    useContext(LoyaltyAppContext);



  useEffect(() => {
    fetchData();
    // const userToken = JSON.parse(localStorage.getItem("user"));
    // dispatch(getAllCustomers())
  }, []);

  if (!isLoading && (!customerPointsData || customerPointsData.length === 0)) {
  // if (!isLoading && (!customers || customers.length === 0)) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <form style={{ paddingBottom: "30px" }}>
        <div>
          <input
            id="search"
            className="input-group input-large"
            type="text"
            placeholder="Search customer by name, id or refId"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Points</th>
            <th>Date Last Visited</th>
          </tr>

          {customerPointsData
          //{customers
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                    item.refId.toString().includes(search.toString());
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.points}</td>
                  <td>{item.lastDateVisited}</td>
                  <td>
                    <div className="edit-link">
                      <Link to={`/update-customer/${item._id}`}>
                        <FaEdit size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerPage;
