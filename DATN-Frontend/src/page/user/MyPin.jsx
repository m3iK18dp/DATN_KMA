/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { AiFillSave } from "react-icons/ai";
import CustomFormGroup from "../../components/CustomFormGroup";
import { checkToken } from "../../services/CheckToken";
import CustomToggle from "../../components/CustomToggle";
import { ToastContainer, toast } from "react-toastify";
import PinComponent from "../../components/PinComponent";
function MyPin() {
  const navigate = useNavigate();
  const [oldPinIsFilled, setOldPinIsFilled] = useState("");
  const [newPinIsFilled, setNewPinIsFilled] = useState("");
  const [passwordIsFilled, setPasswordIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [userPin, setUserPin] = useState({
    password: "",
    oldPin: "",
    newPin: "",
  });

  const [isFirst, setIsFirst] = useState(true);
  const [checkForm, setCheckForm] = useState(true);
  const [inProcessing, setInProcessing] = useState(false);
  // const [passwordLogoutAll, setPasswordLogoutAll] = useState("");
  // const [showLogoutAll, setShowLogoutAll] = useState(false);
  // const [passwordInLogoutIsFull, setPasswordInLogoutIsFull] = useState(false);
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
    setPasswordIsFilled(
      validateInput(userPin.password, Infinity, `Please enter Password`)
    );
    setOldPinIsFilled(validateInput(userPin.oldPin, 6, `Please enter old Pin`));
    setNewPinIsFilled(validateInput(userPin.newPin, 6, "Please new Pin"));
  }, [userPin, isFirst]);
  useEffect(() => {
    setStatus("");
  }, [userPin]);

  const set = (prop, value) => {
    setUserPin({ ...userPin, [prop]: value });
  };
  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setInProcessing(true);
      userService
        .updatePin(userPin.password, userPin.oldPin, userPin.newPin, navigate)
        .then((res) => {
          if (res.status === "ok") {
            toast.success("Update User successful", {
              autoClose: 1000,
            });
          } else {
            setStatus("");
            toast.error("Update User failed!", {
              autoClose: 1000,
            });
          }
          setInProcessing(false);
        });
    } else setStatus("Update failed! Check your information.");
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
          id="container"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: windowHeight <= 470 ? "flex-start" : "center",
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
                  Update User Pin
                </h1>
                <div className="card-body">
                  <Form>
                    <CustomFormGroup
                      // formGroupStyle={{ width: "100%", marginRight: 20 }}
                      type="password"
                      funcEnter={handleSubmit}
                      controlId="oldPin"
                      func={set}
                      placeholder="Enter old Pin"
                      label="Old Pin"
                      value={userPin.oldPin}
                      warning={oldPinIsFilled}
                      readonly={inProcessing}
                    />
                    <CustomFormGroup
                      type="password"
                      funcEnter={handleSubmit}
                      controlId="newPin"
                      func={set}
                      placeholder="Enter new Pin"
                      label="New Pin"
                      value={userPin.newPin}
                      warning={newPinIsFilled}
                      readonly={inProcessing}
                    />

                    <CustomFormGroup
                      type="password"
                      funcEnter={handleSubmit}
                      controlId="password"
                      func={set}
                      placeholder="Enter your Password"
                      label="Password"
                      value={userPin.password}
                      warning={passwordIsFilled}
                      readonly={inProcessing}
                    />

                    <div className="box-footer">
                      <div style={{ textAlign: "center", margin: "20px 0px" }}>
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
                          <AiFillSave size={30}></AiFillSave>
                          <span>{"   "}Change Pin</span>
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

export default MyPin;
