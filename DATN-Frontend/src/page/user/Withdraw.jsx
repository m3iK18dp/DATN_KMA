/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomFormGroup from "../../components/CustomFormGroup";
import { checkToken } from "../../services/CheckToken";
import CustomToggle from "../../components/CustomToggle";
import transactionService from "../../services/TransactionService";
import { ToastContainer, toast } from "react-toastify";
import PinComponent from "../../components/PinComponent";
import userService from "../../services/UserService";
function Withdraw() {
  const navigate = useNavigate();
  const [amountIsFilled, setAmountIsFilled] = useState("");
  const [pinIsFilled, setPinIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [userWithdraw, setUserWithdraw] = useState({
    account: "",
    amount: "",
    pin: "",
  });

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
    setAmountIsFilled(
      validateInput(userWithdraw.amount, Infinity, `Please enter Amount`)
    );
    setPinIsFilled(validateInput(userWithdraw.pin, 6, `Please enter Pin`));
  }, [userWithdraw, isFirst]);
  useEffect(() => {
    setStatus("");
  }, [userWithdraw]);

  const set = (prop, value) => {
    setUserWithdraw({ ...userWithdraw, [prop]: value });
  };
  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setInProcessing(true);
      transactionService
        .withdraw(
          userWithdraw.account,
          userWithdraw.pin,
          userWithdraw.amount,
          navigate
        )
        .then((res) => {
          if (res.status === "ok") {
            toast.success("Withdraw money successful", {
              autoClose: 1000,
            });
          } else {
            setStatus("");
            toast.error("Withdraw money failed!", {
              autoClose: 1000,
            });
          }
          setInProcessing(false);
        });
    } else setStatus("Withdraw money failed! Check your information.");
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
            alignItems: windowHeight <= 480 ? "flex-start" : "center",
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
                  Withdraw Money
                </h1>
                <div className="card-body">
                  <Form>
                    <CustomFormGroup
                      // formGroupStyle={{ width: "100%", marginRight: 20 }}
                      funcEnter={handleSubmit}
                      controlId="account"
                      func={set}
                      placeholder="Enter Account"
                      label="Account"
                      value={userWithdraw.account}
                      warning={amountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      // formGroupStyle={{ width: "100%", marginRight: 20 }}
                      type="number"
                      funcEnter={handleSubmit}
                      controlId="amount"
                      func={set}
                      placeholder="Enter Amount"
                      label="Amount"
                      value={userWithdraw.amount}
                      warning={amountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="pin"
                      func={set}
                      placeholder="Enter Pin"
                      label="Pin"
                      value={userWithdraw.pin}
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
                          <span>{"   "}Withdraw</span>
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

export default Withdraw;
