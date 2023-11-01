import moment from "moment";

function LastUpdateTimeComponent({ date }) {
  // const options = {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  //   hour12: false,
  //   timeZone: "Asia/Ho_Chi_Minh",
  // };
  const lastUpdate = moment(date).format("MMMM DD, YYYY hh:mm A");
  return (
    <p
      style={{
        fontStyle: "italic",
        fontWeight: "bold",
        margin: 0,
        marginTop: "15px",
        color: "green",
        fontSize: 12,
      }}
    >
      Last update: {lastUpdate}
    </p>
  );
}

export default LastUpdateTimeComponent;
