// eslint-disable-next-line react/prop-types
function TransactionType({ transactionType }) {
  const styleType = {
    DEPOSIT: {
      title: "Deposit",
      backgroundColor: "#0084f999",
      color: "#013462",
      width: 65,
    },
    WITHDRAW: {
      title: "Withdraw",
      backgroundColor: "#f9000099",
      color: "#780000",
      width: 75,
    },
    TRANSFER: {
      title: "Transfer",
      backgroundColor: "#27f90099",
      color: "#007812",
      width: 75,
    },
    CREDITED: {
      title: "Credited",
      backgroundColor: "#f9f80099",
      color: "#777800",
      width: 75,
    },
  };
  return (
    <div
      style={{
        backgroundColor: styleType[transactionType].backgroundColor,
        width: styleType[transactionType].width,
        textAlign: "center",
        borderRadius: 8,
        margin: "0 auto",
        border: "1px solid white"
      }}
    >
      <p
        style={{
          fontStyle: "italic",
          fontWeight: "bold",
          margin: 0,
          color: styleType[transactionType].color,
          // color: "white",
          fontSize: 15,
        }}
      >
        {styleType[transactionType].title}
      </p>
    </div>
  );
}

export default TransactionType;
