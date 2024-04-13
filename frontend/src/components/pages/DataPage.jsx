// import { Chart } from "react-google-charts";

function DataPage() {
  const data = [
    { name: "Task", hours: "Hours per Day" },
    { name: "Work", hours: 5 },
    { name: "Eat", hours: 2 },
    { name: "Watch TV", hours: 3 },
    { name: "Commute", hours: 2 },
    { name: "Sleep", hours: 7 },
  ];

  const entries = data.map(({ name, hours }) => [name, hours]);
  console.log(entries);

  const options = {
    title: "My Daily Activities",
    is3D: true,
  };

  return (
    <>
      <h1>Customer Data Chart</h1>
      {/* <Chart
        chartType="PieChart"
        data={entries}
        options={options}
        width={"100%"}
        height={"400px"}
      /> */}
    </>
  );
}

export default DataPage;
