/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomFormGroup from "../../components/CustomFormGroup";
import { checkToken } from "../../services/CheckToken";
import CustomToggle from "../../components/CustomToggle";
import transactionService from "../../services/TransactionService";
import userService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import PinComponent from "../../components/PinComponent";
function Transfer() {
  const navigate = useNavigate();
  const [senderAccountIsFilled, setSenderAccountIsFilled] = useState("");
  const [recipientAccountIsFilled, setRecipientAccountIsFilled] = useState("");
  const [amountIsFilled, setAmountIsFilled] = useState("");
  const [pinIsFilled, setPinIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [userTransfer, setUserTransfer] = useState({
    senderAccount: "",
    amount: "",
    recipientAccount: "",
    description: "",
    pin: "",
  });
  const [fullName, setFullName] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const [checkForm, setCheckForm] = useState(true);
  const [inProcessing, setInProcessing] = useState(false);
  const [checkPin, setCheckPin] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    checkToken(navigate);
    userService.checkPin(navigate).then((res) => {
      if (res.status === "ok") setCheckPin(true);
      else setCheckPin(false);
    });
  }, [navigate]);
  useEffect(() => {
    setCheckForm(true);
    const validateInput = (field, maxLength, message = "") => {
      if (field.length === 0) {
        setCheckForm(false);
        return !isFirst ? message : "";
      }
      if (field.length > maxLength) {
        setCheckForm(false);
        return `You have exceeded the allowed number of characters ${field.length}/${maxLength}`;
      }
      return "";
    };
    setSenderAccountIsFilled(
      validateInput(
        userTransfer.senderAccount,
        8,
        `Please enter Sender Account Number`
      )
    );
    setRecipientAccountIsFilled(
      validateInput(
        userTransfer.recipientAccount,
        8,
        `Please enter Recipient Account Number`
      )
    );
    setAmountIsFilled(
      validateInput(userTransfer.amount, Infinity, `Please enter Amount`)
    );
    setPinIsFilled(validateInput(userTransfer.pin, 6, `Please enter Pin`));
  }, [userTransfer, isFirst]);
  useEffect(() => {
    setStatus("");
  }, [userTransfer]);
  useEffect(() => {
    userService
      .getUserFullNameByAccountNumber(userTransfer.recipientAccount)
      .then((response) => {
        if (response.status === "ok") setFullName(response.data);
        else setFullName("");
      });
  }, [userTransfer.recipientAccount]);
  const set = (prop, value) => {
    setUserTransfer({ ...userTransfer, [prop]: value });
  };
  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setInProcessing(true);
      transactionService
        .transfer(
          userTransfer.senderAccount,
          userTransfer.recipientAccount,
          userTransfer.pin,
          userTransfer.amount,
          userTransfer.description,
          navigate
        )
        .then((res) => {
          if (res.status === "ok") {
            toast.success("Transfer successful", {
              autoClose: 1000,
            });
          } else {
            setStatus("");
            toast.error("Transfer Failed!", {
              autoClose: 1000,
            });
          }
          setInProcessing(false);
        });
    } else setStatus("Transfer failed! Check your information.");
  }
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <CustomToggle></CustomToggle>
      <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
        {/* <NavbarComponent disabled={inProcessing} /> */}
        <div className="background-container" />
        <div className=" background-container-opacity-low" />
        <ToastContainer />
        <PinComponent checkPin={checkPin} setCheckPin={setCheckPin} />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: windowHeight <= 765 ? "flex-start" : "center",
          }}
        >
          <Container>
            <Row
              className="col-md-8 offset-md-2"
              style={{
                margin: "0px auto",
                border: "3px solid purple",
                width: "70%",
                minWidth: 400,
                maxWidth: 500,
                borderRadius: 10,
              }}
            >
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
              >
                <h1
                  className="text-center neon"
                  style={{
                    borderBottom: "2px solid purple",
                    padding: "20px",
                    marginBottom: "0",
                  }}
                >
                  Transfer Money
                </h1>
                <div className="card-body">
                  <Form>
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="senderAccount"
                      func={set}
                      placeholder="Enter Your Account"
                      label="Your Account"
                      value={userTransfer.senderAccount}
                      warning={senderAccountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      type="number"
                      funcEnter={handleSubmit}
                      controlId="amount"
                      func={set}
                      placeholder="Enter Amount"
                      label="Amount"
                      value={userTransfer.amount}
                      warning={amountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="recipientAccount"
                      func={set}
                      placeholder="Enter Recipient Account"
                      label="Recipient Account"
                      value={userTransfer.recipientAccount}
                      warning={recipientAccountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="recipientFullName"
                      func={set}
                      placeholder="Recipient Full Name"
                      label="Recipient Full Name"
                      value={fullName}
                      readonly={true}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="description"
                      func={set}
                      placeholder="Enter Description"
                      label="Description"
                      value={userTransfer.description}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="pin"
                      func={set}
                      placeholder="Enter Pin"
                      label="Pin"
                      value={userTransfer.pin}
                      warning={pinIsFilled}
                      readonly={inProcessing}
                    />
                    <div className="box-footer">
                      <div style={{ textAlign: "center", margin: "30px 0px" }}>
                        <Button
                          disabled={inProcessing}
                          onClick={() => handleSubmit()}
                          style={{
                            backgroundColor: "#e9ecef",
                            border: "none",
                            color: "black",
                            width: 200,
                            borderRadius: 7,
                          }}
                          title="Save"
                        >
                          <span>{"   "}Transfer</span>
                        </Button>
                      </div>
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "red",
                          margin: 0,
                          fontSize: 12,
                        }}
                      >
                        {status}
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Transfer;