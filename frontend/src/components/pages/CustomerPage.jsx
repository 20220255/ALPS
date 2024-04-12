import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../shared/Spinner";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

function CustomerPage() {
  const [search, setSearch] = useState("");

  const { fetchData, customerPointsData, isLoading } =
    useContext(LoyaltyAppContext);

  const [customerData, setCustomerData] = useState(customerPointsData);

  useEffect(() => {
    fetchData();
    setCustomerData(customerPointsData);
    console.log(customerData);
  }, []);

  function handleSortAscend(sort="") {
    const custdata = [...customerData];
    custdata.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    setCustomerData(custdata);
  }

  // if (!isLoading && (!customerPointsData || customerPointsData.length === 0)) {
  if (!isLoading && (!customerData || customerData.length === 0)) {
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
            style={{ width: "100%" }}
          />
        </div>
      </form>
      <table>
        <tbody>
          <tr style={{ backgroundColor: "blueviolet", color: "black" }}>
            <th>Edit</th>
            <th
              className="customer-row"
              onClick={() => {
                handleSortAscend("name");
              }}
            >
              Name
            </th>
            <th
              className="customer-row"
              onClick={() => {
                handleSortAscend("lastName");
              }}
            >
              Last Name
            </th>
          </tr>

          {/* {customerPointsData */}
          {customerData
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
                <tr key={index} className="customer-row">
                  <td>
                    <div className="edit-link">
                      <Link to={`/update-customer/${item._id}`}>
                        <FaEdit size={18} />
                      </Link>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerPage;
