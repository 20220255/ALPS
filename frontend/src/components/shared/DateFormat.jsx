import moment from "moment";

function DateFormat({ date = moment().format("L") }) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7)) - 1;
  const day = parseInt(date.slice(8, 10)) + 0;

  const objDate = {
    year,
    month,
    day,
  };

  const dateFormat = moment(objDate);
  let dateString = dateFormat.format("dddd, Do of MMM YYYY");

  if (dateString === "Invalid date") {
    dateString = "N.A.";
  }

  return (
    <div style={{ alignContent: "center" }}>
      <p
        style={{ alignContent: "center" }}
      >{`Last claimed date: ${dateString}`}</p>
    </div>
  );
}

export default DateFormat;
