import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerList = ({ handleSortAscend, customerData }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form style={{ paddingBottom: "30px" }}>
        <div>
          <input
            id="search"
            className="input-group input-large"
            type="search"
            placeholder="Search customer by name or email"
            onChange={handleChange}
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
          {customerData
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                    item.email?.toString().includes(search?.toString());
            })
            .map((item, index) => {
              const { _id, name, lastName } = item;
              return (
                <tr key={index} className="customer-row">
                  <td>
                    <div className="edit-link">
                      <Link to={`/update-customer/${_id}`}>
                        <FaEdit size={18} />
                      </Link>
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>{lastName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
