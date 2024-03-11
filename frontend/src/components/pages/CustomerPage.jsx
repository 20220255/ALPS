import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../shared/Spinner";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

function CustomerPage() {

  const [search, setSearch] = useState("");

  const { fetchData, customerPointsData, isLoading } =
    useContext(LoyaltyAppContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoading && (!customerPointsData || customerPointsData.length === 0)) {
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
        <div >
          <input
            id="search"
            className="input-group input-large"
            type="text"
            placeholder="Search customer by name, id or refId"
            onChange={(e) => setSearch(e.target.value)}
            style={{width: '100%'}}
          />
        </div>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Points</th> */}
          </tr>

          {customerPointsData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                    item.refId?.toString().includes(search?.toString());
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  {/* <td>{item.points}</td> */}
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
