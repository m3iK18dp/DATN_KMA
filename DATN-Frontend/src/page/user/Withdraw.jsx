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
import OTPComponent from "../../components/OTPComponent";
import CustomSelectOptions from "../../components/CustomSelectOptions";
import accountService from "../../services/AccountService";
function Withdraw() {
  const navigate = useNavigate();
  const [amountIsFilled, setAmountIsFilled] = useState("");
  const [pinIsFilled, setPinIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [userWithdraw, setUserWithdraw] = useState({
    accountNumber: "",
    amount: "",
    pin: "",
  });

  const [isFirst, setIsFirst] = useState(true);
  const [checkForm, setCheckForm] = useState(true);
  const [inProcessing, setInProcessing] = useState(false);
  const [checkPin, setCheckPin] = useState(true);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOTP, setShowOTP] = useState(false);
  const [accounts, setAccounts] = useState([])
  const [selectOption, setSelectOption] = useState(null);
  useEffect(() => {
    if (accounts.length === 0)
      accountService.get({}, navigate).then((response) => {
        setAccounts(response.data.content);
        if (response.data.content?.length > 0)
          setSelectOption(response.data.content[0]);
      });
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (selectOption?.accountNumber)
      set("accountNumber", selectOption.accountNumber)
  }, [selectOption])
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
    if (!isFirst && pinIsFilled === "" && userWithdraw.pin?.length !== 6)
      setPinIsFilled("Pin invalid! Pin have length is 6 number of characters");
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
          userWithdraw.accountNumber,
          userWithdraw.pin,
          userWithdraw.amount,
          otp.join().replaceAll(",", ""),
          navigate
        )
        .then((res) => {
          if (res.status === "ok") {
            setOtp(['', '', '', '', '', ''])
            setShowOTP(false)
            toast.success("Withdraw money successful", {
              autoClose: 1000,
            });
          } else {
            setStatus("");
            setOtp(['', '', '', '', '', ''])
            setShowOTP(false)
            toast.error("Withdraw money failed! " + res.message, {
              autoClose: 1000,
            });
          }
          setInProcessing(false);
        });
    } else setStatus("Withdraw money failed! Check your information.");
  }
  const handleShowOtp = () => {
    setIsFirst(false);
    if (checkForm) {
      userService.checkPinCorrect(userWithdraw.pin, navigate).then(res => {
        if (res.status === "ok") {
          setShowOTP(true);
        }
        else
          setPinIsFilled("Pin Incorrect!")
      })
    }
  }
  return (
    <div className="background-image" style={{ display: "flex", width: "100%", height: "100%" }}>
      <CustomToggle></CustomToggle>
      <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
        {/* <NavbarComponent disabled={inProcessing} /> */}
        {/* <div className="background-container" /> */}
        <div className=" background-container-opacity-low" />
        <ToastContainer />
        <PinComponent checkPin={checkPin} setCheckPin={setCheckPin} />
        <OTPComponent
          otp={otp}
          setOtp={setOtp}
          setShowOTP={setShowOTP}
          showOTP={showOTP}
          funcConfirm={handleSubmit}
          inProcessing={inProcessing}
          setInProcessing={setInProcessing}
        ></OTPComponent>
        <div
          id="container"
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
                border: "3px solid #5d5dd0",
                width: "70%",
                minWidth: 400,
                maxWidth: 500,
                borderRadius: 10,
              }}
            >
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(20,20,20,0.8)",
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
                    {/* <CustomFormGroup
                      // formGroupStyle={{ width: "100%", marginRight: 20 }}
                      funcEnter={handleSubmit}
                      controlId="account"
                      func={set}
                      placeholder="Enter Account"
                      label="Account"
                      value={userWithdraw.account}
                      warning={amountIsFilled}
                      readonly={inProcessing}
                    /> */}
                    <CustomSelectOptions
                      label={"Account"}
                      listOption={accounts}
                      set={setSelectOption}
                      current={selectOption}
                      style={{ width: "100%" }}
                      styleSelect={{ backgroundColor: "white", width: "100%" }}
                      styleOptions={{ width: "100%" }}
                      styleOption={{ width: "100%" }}
                      radius={20}
                      styleLabel={{ color: "white" }}
                    ></CustomSelectOptions>
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
                      styleLabel={{ color: "white" }}
                    />
                    <CustomFormGroup
                      type="password"
                      funcEnter={handleSubmit}
                      controlId="pin"
                      func={set}
                      placeholder="Enter Pin"
                      label="Pin"
                      value={userWithdraw.pin}
                      warning={pinIsFilled}
                      readonly={inProcessing}
                      styleLabel={{ color: "white" }}
                    />
                    <div className="box-footer">
                      <div style={{ textAlign: "center", margin: "30px 0px" }}>
                        <Button
                          disabled={inProcessing}
                          onClick={() => handleShowOtp()}
                          style={{
                            backgroundColor: "#e9ecef",
                            border: "none",
                            color: "black",
                            width: 200,
                            borderRadius: 7,
                          }}
                          title="Withdraw"
                        >
                          <span>Withdraw</span>
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
