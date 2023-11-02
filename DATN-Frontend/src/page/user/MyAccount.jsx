/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { AiFillSave } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaUserEdit, FaUserLock } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";
import LastUpdateTimeComponent from "../../components/LastUpdateTimeComponent";
import CustomFormGroup from "../../components/CustomFormGroup";
import { checkToken } from "../../services/CheckToken";
import CustomToggle from "../../components/CustomToggle";
import { ToastContainer, toast } from "react-toastify";
import PinComponent from "../../components/PinComponent";
function MyAccount() {
  const navigate = useNavigate();

  const [firstNameIsFilled, setFirstNameIsFilled] = useState("");
  const [lastNameIsFilled, setLastNameIsFilled] = useState("");
  const [emailIsFilled, setEmailIsFilled] = useState("");
  const [addressIsFilled, setAddressIsFilled] = useState("");
  const [phoneNumberIsFilled, setPhoneNumberIsFilled] = useState("");
  const [oldPasswordIsFilled, setOldPasswordIsFilled] = useState("");
  const [newPasswordIsFilled, setNewPasswordIsFilled] = useState("");
  const [confirmPasswordIsFilled, setConfirmPasswordIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [listPassword, setListPassword] = useState(["", "", ""]);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    status: 1,
  });

  const [readOnly, setReadOnly] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
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
    userService.getUserInformation(navigate).then((data) => {
      setUser(data.data);
    });
  }, [navigate]);
  useEffect(() => {
    setCheckForm(true);
    const validateInput = (field, maxLength, message = "") => {
      if (!readOnly && field.length === 0) {
        setCheckForm(false);
        return !isFirst ? message : "";
      }
      if (!readOnly && field.length > maxLength) {
        setCheckForm(false);
        return `You have exceeded the allowed number of characters ${field.length}/${maxLength}`;
      }
      return "";
    };
    setFirstNameIsFilled(
      validateInput(user.firstName, 40, `Please enter first name`)
    );
    setLastNameIsFilled(
      validateInput(user.lastName, 10, `Please enter last name`)
    );
    setEmailIsFilled(validateInput(user.email, 50, "Please enter email"));
    setAddressIsFilled(
      validateInput(user.address, 100, "Please enter address")
    );
    setPhoneNumberIsFilled(
      validateInput(user.phoneNumber, 10, "Please enter phone number")
    );
    if (changePassword) {
      setOldPasswordIsFilled(
        validateInput(listPassword[0], Infinity, "Please enter Password")
      );
      setNewPasswordIsFilled(
        validateInput(listPassword[1], Infinity, "Please enter New Password")
      );

      if (listPassword[1] !== "") {
        if (listPassword[1].length < 8 || listPassword[1].length > 20) {
          setCheckForm(false);
          setNewPasswordIsFilled(
            "Invalid password. Password must be between 8 and 20 characters"
          );
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/.test(
            listPassword[1]
          )
        ) {
          setCheckForm(false);
          setNewPasswordIsFilled(
            "Invalid password. Password needs at least 1 uppercase, 1 lowercase, 1 number and 1 special character in @#$%^&+=_!"
          );
        } else setNewPasswordIsFilled("");
      }
      setConfirmPasswordIsFilled(
        validateInput(
          listPassword[2],
          Infinity,
          "Please enter Confirm Password"
        )
      );
      if (listPassword[2] !== "")
        if (listPassword[1] !== listPassword[2]) {
          setCheckForm(false);
          setConfirmPasswordIsFilled(
            "Password and Confirm password do not match"
          );
        } else setConfirmPasswordIsFilled("");
    }
  }, [user, listPassword, isFirst]);
  useEffect(() => {
    setStatus("");
  }, [user, listPassword]);
  const setLstPassword = (index, value) => {
    setListPassword((prevList) =>
      prevList.map((item, i) => (i === index ? value : item))
    );
  };
  const set = (prop, value) => {
    setUser({ ...user, [prop]: value });
  };
  // const covertArrayObjectToString = (roles) => {
  //   if (roles) return roles.map((role) => (role ? role.name : null)).join(", ");
  //   return "";
  // };
  function changeReadOnly() {
    setReadOnly(!readOnly);
  }
  function changeChangePassword() {
    setChangePassword(!changePassword);
  }
  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setInProcessing(true);
      userService.updateUser(user.id, user, navigate).then((res) => {
        if (res.status === "ok") {
          if (changePassword) {
            userService
              .updatePasswordToMyUser(user.id, listPassword, navigate)
              .then((res) => {
                if (res.status === "ok") {
                  setStatus("");
                  toast.success("Update User successful", {
                    autoClose: 1000,
                  });
                  setChangePassword(false);
                  setReadOnly(true);
                } else {
                  setOldPasswordIsFilled(
                    "Password incorrect! Please try again with different Password"
                  );
                }
              });
          } else {
            setStatus("");
            toast.success("Update User successful!", {
              autoClose: 1000,
            });
            setChangePassword(false);
            setReadOnly(true);
          }
        } else {
          setEmailIsFilled(res.message);
          setStatus("Update failed. Try again!");
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
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: windowHeight <= 550 ? "flex-start" : "center",
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
              id="formMyAccount"
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
                  {(readOnly ? "" : "Update \n") + "User Profile"}
                </h1>
                <div className="card-body">
                  <Form>
                    <Col>
                      <CustomFormGroup
                        formGroupStyle={{ width: "100%", marginRight: 20 }}
                        funcEnter={handleSubmit}
                        controlId="firstName"
                        func={set}
                        placeholder="Enter first name"
                        label="First Name"
                        value={user.firstName}
                        warning={firstNameIsFilled}
                        readonly={readOnly || inProcessing}
                      />
                      <CustomFormGroup
                        funcEnter={handleSubmit}
                        controlId="lastName"
                        func={set}
                        placeholder="Enter last name"
                        label="Last Name"
                        value={user.lastName}
                        warning={lastNameIsFilled}
                        readonly={readOnly || inProcessing}
                      />
                    </Col>
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="email"
                      func={set}
                      placeholder="Enter email"
                      label="Email"
                      value={user.email}
                      warning={emailIsFilled}
                      readonly={readOnly || inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="address"
                      func={set}
                      placeholder="Enter address"
                      label="Address"
                      value={user.address}
                      warning={addressIsFilled}
                      readonly={readOnly || inProcessing}
                    />
                    <CustomFormGroup
                      funcEnter={handleSubmit}
                      controlId="phoneNumber"
                      func={set}
                      placeholder="Enter phone number"
                      label="Phone Number"
                      value={user.phoneNumber}
                      warning={phoneNumberIsFilled}
                      readonly={readOnly || inProcessing}
                    />
                    {readOnly ? (
                      <>
                        <Form.Group className="mb-3" controlId="change">
                          <CustomButton
                            field={user.id}
                            IconButton={FaUserEdit}
                            size={30}
                            func={changeReadOnly}
                            title={"Enable User"}
                            id="change"
                            color="rgba(255,255,255,0.7)"
                            disable={inProcessing}
                          />
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: 20,
                            }}
                            onMouseOver={(e) => {
                              e.target.style.color = "rgb(40, 144, 144)";
                              e.target.style.cursor = "pointer";
                            }}
                            onMouseOut={(e) =>
                              (e.target.style.color = "rgba(255,255,255,0.7)")
                            }
                            onClick={() => {
                              if (!inProcessing) changeReadOnly();
                            }}
                          >
                            <Form.Text
                              style={{
                                color: "rgba(255,255,255,0.7)",
                              }}
                              className="neon"
                            >
                              Change User Information
                            </Form.Text>
                          </div>
                        </Form.Group>
                      </>
                    ) : (
                      <>
                        <Form.Group
                          className="mb-3 "
                          controlId="changePassword"
                          onClick={() => {
                            if (!inProcessing) changeChangePassword();
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = "rgb(40, 144, 144)";
                            e.target.style.cursor = "pointer";
                          }}
                          onMouseOut={(e) => (e.target.style.color = "black")}
                        >
                          <FaUserLock size={30} />
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: 20,
                            }}
                          >
                            <Form.Text className=" neon">
                              {!changePassword
                                ? "Click here if you want change password"
                                : "Click here if you do not want change password"}
                            </Form.Text>
                          </div>
                        </Form.Group>
                        {changePassword && (
                          <>
                            <CustomFormGroup
                              funcEnter={handleSubmit}
                              prop={0}
                              type="password"
                              controlId="old"
                              func={setLstPassword}
                              placeholder="Enter password"
                              label="Password"
                              value={listPassword[0]}
                              warning={oldPasswordIsFilled}
                              readOnly={inProcessing}
                            />
                            <Col>
                              <CustomFormGroup
                                formGroupStyle={{ marginRight: 20 }}
                                funcEnter={handleSubmit}
                                prop={1}
                                type="password"
                                controlId="new"
                                func={setLstPassword}
                                placeholder="Enter new password"
                                label="New Password"
                                value={listPassword[1]}
                                warning={newPasswordIsFilled}
                                readOnly={inProcessing}
                              />
                              <CustomFormGroup
                                funcEnter={handleSubmit}
                                prop={2}
                                type="password"
                                controlId="confirm"
                                func={setLstPassword}
                                placeholder="Enter confirm password"
                                label="Confirm Password"
                                value={listPassword[2]}
                                warning={confirmPasswordIsFilled}
                                readOnly={inProcessing}
                              />
                            </Col>
                          </>
                        )}
                        <div className="box-footer">
                          <div
                            style={{ textAlign: "center", margin: "10px 0px" }}
                          >
                            <Button
                              disabled={inProcessing}
                              onClick={() => handleSubmit()}
                              style={{
                                backgroundColor: "#e9ecef",
                                border: "none",
                                color: "black",
                              }}
                              title="Save"
                            >
                              <AiFillSave size={30}></AiFillSave>Save
                            </Button>
                            <Button
                              disabled={inProcessing}
                              variant="danger"
                              onClick={() => changeReadOnly()}
                              style={{
                                backgroundColor: "#e9ecef",
                                border: "none",
                                color: "black",
                                marginLeft: 20,
                              }}
                            >
                              <MdCancel size={30}></MdCancel>Cancel
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
                          <LastUpdateTimeComponent date={user.lastUpdated} />
                        </div>
                      </>
                    )}
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

export default MyAccount;
