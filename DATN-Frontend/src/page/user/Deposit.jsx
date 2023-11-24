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
import otpService from "../../services/OTPService";
import accountService from "../../services/AccountService";
import CustomSelectOptions from "../../components/CustomSelectOptions";
function Deposit() {
  const navigate = useNavigate();
  const [amountIsFilled, setAmountIsFilled] = useState("");
  const [pinIsFilled, setPinIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [userDeposit, setUserDeposit] = useState({
    account: "",
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
      set("account", selectOption.accountNumber)
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
      validateInput(userDeposit.amount.toString(), Infinity, `Please enter Amount`)
    );

    setPinIsFilled(validateInput(userDeposit.pin, 6, `Please enter Pin`));
    if (!isFirst && pinIsFilled === "" && userDeposit.pin?.length !== 6)
      setPinIsFilled("Pin invalid! Pin have length is 6 number of characters");
  }, [userDeposit, isFirst]);
  useEffect(() => {
    setStatus("");
  }, [userDeposit]);

  const set = (prop, value) => {
    setUserDeposit({ ...userDeposit, [prop]: value });
  };

  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setInProcessing(true);
      transactionService
        .deposit(
          userDeposit.account,
          userDeposit.pin,
          userDeposit.amount,
          otp.join().replaceAll(",", ""),
          navigate
        )
        .then((res) => {
          if (res.status === "ok") {
            setOtp(['', '', '', '', '', ''])
            setShowOTP(false)
            toast.success("Deposit money successful", {
              autoClose: 1000,
            });
          } else {
            setStatus("");
            toast.error("Deposit money failed!");
          }
          setInProcessing(false);
        });
    } else setStatus("Deposit money failed! Check your information.");
  }
  const handleShowOtp = () => {
    setIsFirst(false);
    if (checkForm) {
      userService.checkPinCorrect(userDeposit.pin, navigate).then(res => {
        if (res.status === "ok") {
          setShowOTP(true);
        }
        else
          setPinIsFilled("Pin Incorrect!")
      })
    }
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
                  Deposit Money
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
                      value={userDeposit.account}
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
                    ></CustomSelectOptions>
                    <CustomFormGroup
                      // formGroupStyle={{ width: "100%", marginRight: 20 }}
                      type="number"
                      funcEnter={handleSubmit}
                      controlId="amount"
                      func={set}
                      placeholder="Enter Amount"
                      label="Amount"
                      value={userDeposit.amount}
                      warning={amountIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      type="password"
                      funcEnter={handleSubmit}
                      controlId="pin"
                      func={set}
                      placeholder="Enter Pin"
                      label="Pin"
                      value={userDeposit.pin}
                      warning={pinIsFilled}
                      readonly={inProcessing}
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
                          title="Deposit"
                        >
                          <span>{"   "}Deposit</span>
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

export default Deposit;
