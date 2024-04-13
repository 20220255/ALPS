import { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";

const data = [
  { name: "Task", hours: "Hours per Day" },
  { name: "Work", hours: 5 },
  { name: "Eat", hours: 2 },
  { name: "Watch TV", hours: 3 },
  { name: "Commute", hours: 2 },
  { name: "Sleep", hours: 7 },
];

function DataPage() {
  const entries = data.map(({ name, hours }) => [name, hours]);

  const { customerPointsData, fetchData } = useContext(LoyaltyAppContext);
  const [customerData, setCustomerData] = useState()

  useEffect(() => {
    fetchData()
    setCustomerData(customerPointsData)
  },[]);

  const options = {
    title: "My Daily Activities",
    is3D: true,
  };

  return (
    <>
      <h1>hello</h1>
      <Chart
        chartType="PieChart"
        data={entries}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>

    // <Chart
    //   chartType="PieChart"
    //   data={entries}
    //   options={options}
    //   width={"100%"}
    //   height={"400px"}
    // />
  );
}

// }

export default DataPage;
