/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Col } from "react-bootstrap";
import "../../css/login.css";
import { useState, useEffect } from "react";
import authenticationService from "../../services/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import CustomFormGroup from "../../components/CustomFormGroup";
import CustomButton from "../../components/CustomButton";
import { checkToken } from "../../services/CheckToken";
import { toast } from "react-toastify";
import otpService from "../../services/OTPService";
function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate, 0);
    if (localStorage.getItem("token")) navigate("/u/dashboard");
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const set = (prop, value) => {
    if (prop === "otp")
      setOtp(value);
    else
      setUser({ ...user, [prop]: value });
  };
  const [firstNameIsFilled, setFirstNameIsFilled] = useState("");
  const [lastNameIsFilled, setLastNameIsFilled] = useState("");
  const [emailIsFilled, setEmailIsFilled] = useState("");
  const [addressIsFilled, setAddressIsFilled] = useState("");
  const [phoneNumberIsFilled, setPhoneNumberIsFilled] = useState("");
  const [passwordIsFilled, setPasswordIsFilled] = useState("");
  const [confirmPasswordIsFilled, setConfirmPasswordIsFilled] = useState("");
  const [otpIsFilled, setOtpIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const [checkForm, setCheckForm] = useState(true);
  const [inProcessing, setInProcessing] = useState(false);
  const [otp, setOtp] = useState("");
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
  useEffect(() => {
    setCheckForm(true);
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
    setPasswordIsFilled(
      validateInput(user.password, 20, "Please enter password")
    );
    setOtpIsFilled(validateInput(otp, Infinity, "Please enter OTP"))
    if (user.password !== "") {
      if (user.password.length < 8 || user.password.length > 20) {
        setCheckForm(false);
        setPasswordIsFilled(
          "Invalid password. Password must be between 8 and 20 characters"
        );
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/.test(
          user.password
        )
      ) {
        setCheckForm(false);
        setPasswordIsFilled(
          "Invalid password. Password needs at least 1 uppercase, 1 lowercase, 1 number and 1 special character in @#$%^&+=_!"
        );
      } else setPasswordIsFilled("");
    }
    setConfirmPasswordIsFilled(
      validateInput(
        user.confirmPassword,
        Infinity,
        "Please enter Confirm Password"
      )
    );
    if (user.confirmPassword !== "")
      if (user.password !== user.confirmPassword) {
        setCheckForm(false);
        setConfirmPasswordIsFilled(
          "Password and Confirm password do not match"
        );
      } else setConfirmPasswordIsFilled("");
  }, [isFirst, user]);
  useEffect(() => {
    setStatus("");
  }, [user]);
  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setStatus("Please wait...Saving is in progress");
      setInProcessing(true);
      authenticationService.register(user, otp, navigate).then((res) => {
        if (res.status === "ok") {
          setStatus("");
          toast.success("Registration successful!", {
            autoClose: 1000,
          });
          navigate("/login");
        } else {
          setEmailIsFilled(res.message);
          setStatus("Registration failed.");
        }
        setInProcessing(false);
      });
    } else {
      setStatus("Failed. Please check information entered.");
    }
  }
  const [countTime, setCountTime] = useState(-1)
  useEffect(() => {
    setTimeout(() => {
      if (countTime > 0 && countTime <= 60)
        setCountTime(countTime - 1);
    }, 1000)
  }, [countTime])
  return (
    <div>
      <NavbarComponent disabled={inProcessing} />
      <div className="background-container" />
      <div className=" background-container-opacity-low" />

      <div
        fluid="true"
        style={{
          with: "80%",
          minWidth: 400,
          maxWidth: 550,
          paddingTop: 100,
          margin: "0px auto",
        }}
      >
        <Col
          className="card"
          style={{
            border: "3px solid purple",
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: "20px",
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
            Registration
          </h1>

          <div
            className="card-body"
            style={{
              with: "80%",
              minWidth: 250,
              maxWidth: 550,
            }}
          >
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
                  readonly={inProcessing}
                />
                <CustomFormGroup
                  funcEnter={handleSubmit}
                  controlId="lastName"
                  func={set}
                  placeholder="Enter last name"
                  label="Last Name"
                  value={user.lastName}
                  warning={lastNameIsFilled}
                  readonly={inProcessing}
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
                readonly={inProcessing}
              />
              <CustomFormGroup
                funcEnter={handleSubmit}
                controlId="address"
                func={set}
                placeholder="Enter address"
                label="Address"
                value={user.address}
                warning={addressIsFilled}
                readonly={inProcessing}
              />
              <CustomFormGroup
                funcEnter={handleSubmit}
                controlId="phoneNumber"
                func={set}
                placeholder="Enter phone number"
                label="Phone Number"
                value={user.phoneNumber}
                warning={phoneNumberIsFilled}
                readonly={inProcessing}
              />
              <Col>
                <CustomFormGroup
                  formGroupStyle={{ marginRight: 20 }}
                  funcEnter={handleSubmit}
                  controlId="password"
                  func={set}
                  placeholder="Enter password"
                  label="Password"
                  value={user.password}
                  type="password"
                  warning={passwordIsFilled}
                  readonly={inProcessing}
                />
                <CustomFormGroup
                  funcEnter={handleSubmit}
                  controlId="confirmPassword"
                  func={set}
                  placeholder="Enter confirm password"
                  label="Confirm Password"
                  value={user.confirmPassword}
                  type="password"
                  warning={confirmPasswordIsFilled}
                  readonly={inProcessing}
                />
              </Col>
              <CustomFormGroup
                type="text"
                funcEnter={handleSubmit}
                controlId="formOtp"
                prop="otp"
                func={set}
                placeholder={"Enter OTP"}
                label={"OTP"}
                value={otp}
                warning={otpIsFilled}
                readonly={inProcessing}
              />
              <div className="text-right">
                <div className={`text-sm italic underline transition-color duration-300 hover:text-gray-600 ${countTime > 0 || user.email === "" ? "hover:cursor-not-allowed text-gray-500" : "hover:cursor-pointer"}`}
                  onClick={() => {
                    if (countTime <= 0 && user.email !== "") {
                      setCountTime(70);
                      otpService.createOTP(user.email, 2, navigate)
                        .then(
                          res => {
                            if (res.status === "ok") {
                              toast.success((countTime === -1 ? "Send" : "Resend") + " OTP Success", { autoClose: 1000 });
                              setCountTime(60);
                            } else {
                              toast.error((countTime === -1 ? "Send" : "Resend") + " OTP Failed. Try again!", { autoClose: 1000 });
                              setCountTime(0);
                            };
                          }
                        );
                    }
                  }}
                >
                  {countTime === -1 ? "Get OTP" : countTime === 0 ? "Resend OTP" : countTime <= 60 ? `Resend (${countTime}s)` : "Waiting Send OTP"}
                </div>

              </div>
              <CustomButton
                className="text-center "
                style={{
                  width: 120,
                  height: 45,
                  margin: "15px auto",
                  textAlign: "center",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 10,
                  border: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size={20}
                color="white"
                variant="primary"
                func={handleSubmit}
                text="Register"
                disable={inProcessing}
              />
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
              <div className="mt-4">
                <p className="text-center">
                  You have account?{" "}
                  <Link to={inProcessing ? false : "/login"} className=" neon">
                    Login here
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </div>
    </div>
  );
}
export default Register;
