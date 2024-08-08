import { Chart } from "react-google-charts";
import PointsContext from "../../context/PointsContext";
import { useContext, useEffect, useState } from "react";
import LoyaltyAppContext from "../../context/LoyaltyAppContext";
import Spinner from "../shared/Spinner";

function DataPage() {
  const { totalPtsPerCust, getTotalPtsPerCust } = useContext(PointsContext);
  const { fetchData, customerPointsData, isLoading, setIsLoading } =
    useContext(LoyaltyAppContext);
  const [showTopCust10, setShowTopCust10] = useState();
  const [showTopCust20, setShowTopCust20] = useState();
  const options = {
    title: "Top 10 Customers",
    is3D: true,
  };

  const options2 = {
    title: "Top 20 Customers",
  };
  useEffect(() => {
    setIsLoading(true);
    const getDataChart = async () => {
      await getTotalPtsPerCust();
      await fetchData();
    };
    getDataChart();
  }, []);

  // Todo Task getTotal Points per Customer
  const handleClick = async () => {
    const result = await totalPtsPerCust.reduce((a, c) => {
      a[c.userId] = a[c.userId] || { userId: c.userId, points: 0 };
      a[c.userId].points += c.points;
      return a;
    }, {});

    const custData = await customerPointsData.map((d) => ({
      userId: d._id,
      name: d.name,
      lastName: d.lastName,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    }));
    const arr1 = Object.values(result);
    const arr2 = custData;

    const map = new Map();
    arr1.forEach((item) => map.set(item.userId, item));
    arr2.forEach((item) =>
      map.set(item.userId, { ...map.get(item.userId), ...item })
    );
    const mergedArr = Array.from(map.values());

    const filteredMergedArr2 = mergedArr.filter(({ userId }) => userId);

    //remove snap from customer
    const filteredMergedArr = filteredMergedArr2.filter(
      (u) => u.name !== "snap"
    );

    const topN = (filteredMergedArr, n) => {
      if (n > filteredMergedArr.length) {
        return false;
      }
      return filteredMergedArr
        .slice()
        .sort((a, b) => {
          return b.points - a.points;
        })
        .slice(0, n);
    };
    const topTen = await topN(filteredMergedArr, 10);
    const topTwenty = await topN(filteredMergedArr, 20);

    const topTwentyWithColor = await topTwenty.map(
      ({ name, lastName, points, color }) => ({
        name,
        lastName,
        points,
        color,
      })
    );

    const withHeader10 = [{ name: "Customers", points: "Points" }, ...topTen];
    const withHeader20 = [
      { name: "Customers", points: "Points", color: { role: "style" } },
      ...topTwentyWithColor,
    ];

    const myTopCust10 = withHeader10.map(({ name, lastName, points }) => [
      name + " " + lastName + " - " + points + " points",
      points,
    ]);

    const myTopCust20 = withHeader20.map(
      ({ name, lastName, points, color }) => [
        name + " " + lastName,
        points,
        color,
      ]
    );

    setShowTopCust10(myTopCust10);
    setShowTopCust20(myTopCust20);
  };

  if (customerPointsData.length > 1 && !isLoading) {
    return (
      <>
        <h1>Customer Data Chart</h1>
        {showTopCust10 && (
          <Chart
            chartType="PieChart"
            data={showTopCust10}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        )}

        {showTopCust20 && (
          <Chart
            chartType="ColumnChart"
            data={showTopCust20}
            options={options2}
            width={"100%"}
            height={"400px"}
          />
        )}

        <button onClick={handleClick}>Show Charts</button>
      </>
    );
  } else {
    return <Spinner />;
  }
}

export default DataPage;
