import "../../css/login.css";
import authenticationService from "../../services/AuthenticationService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import CustomFormGroup from "../../components/CustomFormGroup";
import CustomButton from "../../components/CustomButton";
import { checkToken } from "../../services/CheckToken";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate, 0);
    if (localStorage.getItem("token")) navigate("/u/dashboard");
  });
  const [authLogin, setAuthLogin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isFirst, setIsFirst] = useState(true);
  const set = (prop, value) => {
    setAuthLogin({ ...authLogin, [prop]: value });
  };
  const [usernameIsFilled, setUsernameIsFilled] = useState(" ");
  const [passwordIsFilled, setPasswordIsFilled] = useState(" ");
  const [confirmPasswordIsFilled, setConfirmPasswordIsFilled] = useState(" ");
  const [status, setStatus] = useState("");
  const [inProcessing, setInProcessing] = useState(false);
  const [checkForm, setCheckForm] = useState(true);
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
    if (!token) {
      setUsernameIsFilled(
        validateInput(authLogin.username, 50, "Please enter username")
      );
    } else {
      setPasswordIsFilled(
        validateInput(authLogin.password, 20, "Please enter password")
      );
      if (authLogin.password !== "") {
        if (authLogin.password.length < 8 || authLogin.password.length > 20) {
          setCheckForm(false);
          setPasswordIsFilled(
            "Invalid password. Password must be between 8 and 20 characters"
          );
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/.test(
            authLogin.password
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
          authLogin.confirmPassword,
          Infinity,
          "Please enter Confirm Password"
        )
      );
      if (authLogin.confirmPassword !== "")
        if (authLogin.password !== authLogin.confirmPassword) {
          setCheckForm(false);
          setConfirmPasswordIsFilled(
            "Password and Confirm password do not match"
          );
        } else setConfirmPasswordIsFilled("");
    }
  }, [authLogin, isFirst, status]);
  useEffect(() => {
    setStatus("");
  }, [authLogin]);
  const handleSubmit = () => {
    setIsFirst(false);
    if (checkForm) {
      setStatus("Please wait...Submit in progress");
      setInProcessing(true);
      if (!token) {
        authenticationService
          .submitResetPassword(authLogin.username, navigate)
          .then((data) => {
            if (data.status === "ok") {
              toast.success(
                "Submit successful! Check your email inbox to reset your password",
                {
                  autoClose: 1000,
                }
              );
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            } else {
              toast.error("Submit failed. " + data.message, {
                autoClose: 1000,
              });
            }
            setInProcessing(false);
            setStatus("")
          });
      }
      else {
        setStatus("Please wait...Change Password in progress");
        authenticationService
          .changePasswordForForgerPassword(authLogin.password, token, navigate)
          .then((data) => {
            if (data.status === "ok") {
              toast.success("Change password successful!", {
                autoClose: 1000,
              });
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            } else {
              toast.error("Change password failed. " + data.message, {
                autoClose: 1000,
              });
            }
            setStatus("")
            setInProcessing(false);
          });
      }
    } else {
      setStatus(
        !token
          ? "Please enter your email!"
          : "Please enter new password and confirm password!"
      );
    }
  };

  return (
    <div>
      <NavbarComponent disabled={inProcessing} />
      <div className="background-container" />
      <div className=" background-container-opacity-low" />
      <ToastContainer />
      <div
        // fluid="true"
        style={{
          with: "70%",
          minWidth: 300,
          maxWidth: 400,
          paddingTop: 150,
          margin: "0px auto",
        }}
      >
        <Col
          className="card "
          style={{
            border: "3px solid #5d5dd0",
            backgroundColor: "rgba(20,20,20,0.4)",
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
            Forget Password
          </h1>
          <div
            className="card-body"
            style={{
              with: "80%",
              minWidth: 400,
              maxWidth: 550,
              padding: "10px 50px",
            }}
          >
            <Form className="card-body">
              {!token ? (
                <CustomFormGroup
                  funcEnter={handleSubmit}
                  controlId="formBasicUsername"
                  prop="username"
                  func={set}
                  placeholder="Enter your email"
                  label="Your email"
                  value={authLogin.username}
                  warning={usernameIsFilled}
                  readonly={inProcessing}
                />
              ) : (
                <>
                  <CustomFormGroup
                    type="password"
                    funcEnter={handleSubmit}
                    controlId="formBasicPassword"
                    prop="password"
                    func={set}
                    placeholder="Enter new password"
                    label="New Password"
                    value={authLogin.password}
                    warning={passwordIsFilled}
                    readonly={inProcessing}
                  />{" "}
                  <CustomFormGroup
                    type="password"
                    funcEnter={handleSubmit}
                    controlId="formBasicConfirmPassword"
                    prop="confirmPassword"
                    func={set}
                    placeholder="Enter confirm password"
                    label="Confirm Password"
                    value={authLogin.confirmPassword}
                    warning={confirmPasswordIsFilled}
                    readonly={inProcessing}
                  />
                </>
              )}
              <CustomButton
                className="text-center "
                style={{
                  width: 100,
                  height: 45,
                  margin: "25px auto",
                  textAlign: "center",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  borderRadius: 15,
                  border: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size={20}
                color="white"
                func={handleSubmit}
                text="Submit"
                disable={inProcessing}
              />{" "}
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
                  Do you want login?{" "}
                  <Link to={inProcessing ? false : "/login"} className="neon">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default ForgetPassword;
