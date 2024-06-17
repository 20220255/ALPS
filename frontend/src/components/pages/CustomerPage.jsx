import { useContext, useEffect, useState } from "react";
import Spinner from "../shared/Spinner";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";
import CustomerList from "../CustomerList";

function CustomerPage() {
  const { fetchData, customerPointsData, isLoading } =
    useContext(LoyaltyAppContext);

  const [customerData, setCustomerData] = useState([{}]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSortAscend(sort = "") {
    const custdata = [...customerPointsData];
    custdata.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    setCustomerData(custdata);
  }

  const getData = () => {
    setCustomerData(customerPointsData);
  };

  if (!isLoading && !customerPointsData) {
    return <Spinner />;
  }

  return isLoading ? (
    <Spinner />
  ) : customerData.length === 1 ? (
    <button className="btn-md-navy-wide" type="button" onClick={getData}>
      Show Customers
    </button>
  ) : (
    <CustomerList
      handleSortAscend={handleSortAscend}
      customerData={customerData}
    />
  );
}

export default CustomerPage;
