/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpService from "../services/OTPService";
function OTPComponent({ otp = [], setOtp, showOTP, setShowOTP, funcConfirm, inProcessing }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (otp.join().replaceAll(",", "") === "")
      toast.error("Please enter OTP", { autoClose: 1000 });
    else if (otp.join().replaceAll(",", "").length !== 6)
      toast.error("OTP entered invalid!");
    else
      funcConfirm();
  };

  const handleOtpChange = (index, value) => {
    if (!inProcessing)
      // Kiểm tra xem giá trị nhập vào có phải là số không
      if (/^[0-9]*$/.test(value)) {
        // Cập nhật giá trị của ô input
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô kế tiếp nếu có giá trị và không phải ô cuối cùng
        if (value && index < 5) {
          document.getElementById(`otp${index + 1}`).focus();
        }
      }
  };

  const handleBackspace = (index, event) => {
    if (!inProcessing)
      // Xóa giá trị của ô input nếu đã rỗng và không phải ở ô đầu tiên
      if (index > 0 && !otp[index] && event.key === "Backspace") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        document.getElementById(`otp${index - 1}`).focus();
      }
  };
  const [countTime, setCountTime] = useState(-1)
  const handleSendOTP = () => {
    const username = sessionStorage.getItem("username");
    if (username)
      if (countTime <= 0 && username) {
        setCountTime(70);
        otpService.createOTP(username, 3, navigate)
          .then(
            res => {
              if (res.status === "ok") {
                toast.success((countTime === -1 ? "Send" : "Resend") + " OTP Success", { autoClose: 1000 });
                setCountTime(60);
              } else {
                toast.error((countTime === -1 ? "Send" : "Resend") + " OTP Failed. Try again! " + res.message, { autoClose: 1000 });
                setCountTime(0);
              };
            }
          );
      }
  }
  useEffect(() => {
    if (showOTP)
      handleSendOTP()
  }, [showOTP])
  useEffect(() => {
    setTimeout(() => {
      if (countTime > 0 && countTime <= 60)
        setCountTime(countTime - 1);
    }, 1000)
  }, [countTime])
  return (
    showOTP && (
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.5)",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ToastContainer />
        <div
          style={{
            width: 550,
            height: 200,
            background: "black",
            borderRadius: 7,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <div>
            <h2 style={{ color: "white" }}>Enter OTP to Confirm Transaction</h2>
          </div>
          <div
            style={{
              display: "flex",
              width: "70%",
              justifyContent: "space-evenly",
            }}
          >
            {otp?.map((o, index) => (
              <div
                key={index}
                style={{
                  width: 40,
                  height: 50,
                  background: "white",
                  borderRadius: 5,
                  boxShadow:
                    "rgba(99, 99, 99, 0.25) 0px 14px 28px, rgba(255, 255, 255, 0.22) 0px 10px 10px",
                }}
              >
                <input
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "30px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  type="text"
                  value={o}
                  id={`otp${index}`}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                ></input>
              </div>
            ))}
          </div>
          <div className={`text-sm italic underline transition-color duration-300 text-gray-700 hover:text-gray-600 ${countTime > 0 || !sessionStorage.getItem("username") ? "hover:cursor-not-allowed text-gray-500" : "hover:cursor-pointer"}`}
            onClick={() => {
              if (!inProcessing)
                handleSendOTP()
            }}
          >
            {countTime === -1 ? "Get OTP" : countTime === 0 ? "Resend OTP" : countTime <= 60 ? `Resend (${countTime}s)` : "Waiting Send OTP"}
          </div>
          <div style={{ display: "flex", width: "50%", justifyContent: "space-between" }}>
            <div
              style={{
                marginTop: 10,
                padding: "5px 10px",
                backgroundColor: "white",
                borderRadius: 5,
              }}
              onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
              onClick={() => {
                setOtp(["", "", "", "", "", ""]);
                setShowOTP(false);
              }}
            >
              <span>Cancel</span>
            </div>
            <div
              style={{
                marginTop: 10,
                padding: "5px 10px",
                backgroundColor: "white",
                borderRadius: 5,
              }}
              onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
              onClick={() => handleSubmit()}
            >
              <span>Confirm</span>
            </div>
          </div>

        </div>
      </div>
    )
  );
}
export default OTPComponent;
