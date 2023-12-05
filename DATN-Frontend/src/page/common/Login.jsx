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
import otpService from "../../services/OTPService";

function Login({ setToken }) {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate, 0);
    if (localStorage.getItem("token")) navigate("/dashboard");
  });
  const [authLogin, setAuthLogin] = useState({
    username: "",
    password: "",
  });
  const [isFirst, setIsFirst] = useState(true);
  const set = (prop, value) => {
    setAuthLogin({ ...authLogin, [prop]: value });
  };
  const [usernameIsFilled, setUsernameIsFilled] = useState(" ");
  const [passwordIsFilled, setPasswordIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [inProcessing, setInProcessing] = useState(false);
  const [typeLogin, setTypeLogin] = useState(0)
  useEffect(() => {
    setUsernameIsFilled(
      authLogin.username === "" && !isFirst ? "Please enter username" : ""
    );
    setPasswordIsFilled(
      authLogin.password === "" && !isFirst ? `Please enter ${typeLogin === "0" ? "Password" : "OTP"}` : ""
    );
  }, [authLogin, isFirst, status]);
  useEffect(() => {
    setStatus("");
  }, [authLogin]);
  const handleSubmit = () => {
    setIsFirst(false);
    if (!(authLogin.username === "" || authLogin.password === "")) {
      setStatus("Please wait...Login in progress");
      setInProcessing(true);
      (typeLogin === 0 ? authenticationService.login(authLogin, navigate) : authenticationService.loginByOTP(authLogin, navigate)).then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token", data.data[0]);
          toast.success("Login successful!", {
            autoClose: 1000,
          });
          setToken(data.data[0])
          navigate("/u/dashboard");
        } else {
          toast.error("Login failed. " + data.message, {
            autoClose: 1000,
          });
        }
        setStatus("")
        setInProcessing(false);
      });
    } else {
      setStatus("Please enter username and password.");
    }
  };
  const [countTime, setCountTime] = useState(-1)
  useEffect(() => {
    setTimeout(() => {
      if (countTime > 0 && countTime <= 60)
        setCountTime(countTime - 1);
    }, 1000)
  }, [countTime])
  return (
    <div className="background-image">
      <NavbarComponent disabled={inProcessing} />
      <div className=" background-container-opacity-low" />
      <ToastContainer />
      <div
        fluid="true"
        style={{
          with: "80%",
          minWidth: 350,
          maxWidth: 450,
          paddingTop: 150,
          height: 'calc(100% - 150px)',
          margin: "0px auto",
        }}
      >
        <Col
          className="card"
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
              color: "white"
            }}
          >
            Login
          </h1>
          <div className="card-body py-10 px-10">
            <Form className="card-body">
              <CustomFormGroup
                funcEnter={handleSubmit}
                controlId="formBasicUsername"
                prop="username"
                func={set}
                placeholder="Enter username"
                label="Username"
                value={authLogin.username}
                warning={usernameIsFilled}
                readonly={inProcessing}
                styleLabel={{
                  color: "white",
                }}
              />

              <CustomFormGroup
                type="password"
                funcEnter={handleSubmit}
                controlId="formBasicPassword"
                prop="password"
                func={set}
                placeholder={typeLogin === 0 ? "Enter password" : "Enter OTP"}
                label={typeLogin === 0 ? "Password" : "OTP"}
                value={authLogin.password}
                warning={passwordIsFilled}
                readonly={inProcessing}
                styleLabel={{
                  color: "white",
                }}
              />
              <div className="flex">

                <div className="text-sm italic underline transition-color duration-300 hover:cursor-pointer"
                  style={{ color: "white" }}
                  onClick={() => {
                    set("password", "");
                    setTypeLogin(typeLogin === 0 ? 1 : 0);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "gray"}
                  onMouseOut={(e) => e.currentTarget.style.color = "white"}
                >
                  {typeLogin === 0 ? "Login with OTP" : "Login with Password"}
                </div>
                {
                  typeLogin === 1 &&
                  <div className={`text-sm italic underline transition-color duration-300 hover:text-white-600 ${countTime > 0 || authLogin.username === "" ? "hover:cursor-not-allowed text-white-700" : "hover:cursor-pointer"}`}
                    onClick={() => {
                      if (countTime <= 0 && authLogin.username !== "") {
                        setCountTime(70);
                        otpService.createOTP(authLogin.username, 1, navigate)
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
                }
              </div>

              <CustomButton
                // className="text-center "
                className="w-100 h-45 m-25 auto text-center bg-opacity-40 rounded-15 border border-white flex items-center justify-center"
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
                text="Login"
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
                <p className="text-center" style={{ color: "white" }}>
                  You forget password?{" "}
                  <Link
                    to={inProcessing ? false : "/forget-password"}
                    className="neon"
                  >
                    Forget Password
                  </Link>
                </p>
                <p className="text-center" style={{ color: "white" }}>
                  Don't have an account?{" "}
                  <Link
                    to={inProcessing ? false : "/register"}
                    className="neon"
                  >
                    Register
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

export default Login;
