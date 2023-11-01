/* eslint-disable react/prop-types */
import { useState } from "react";
import userService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PinComponent({ checkPin, setCheckPin }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    userService
      .createPin(pins.join().replaceAll(",", ""), navigate)
      .then((res) => {
        if (res.status === "ok") {
          setCheckPin(true);
          toast.success("Create Pin success", {
            autoClose: 1000,
          });
        } else {
          toast.error(res.message, {
            autoClose: 1000,
          });
        }
      });
  };
  const [pins, setPins] = useState(["", "", "", "", "", ""]);

  const handlePinChange = (index, value) => {
    // Kiểm tra xem giá trị nhập vào có phải là số không
    if (/^[0-9]*$/.test(value)) {
      // Cập nhật giá trị của ô input
      const newPins = [...pins];
      newPins[index] = value;
      setPins(newPins);

      // Tự động chuyển sang ô kế tiếp nếu có giá trị và không phải ô cuối cùng
      if (value && index < 5) {
        document.getElementById(`pin${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    // Xóa giá trị của ô input nếu đã rỗng và không phải ở ô đầu tiên
    if (index > 0 && !pins[index] && event.key === "Backspace") {
      const newPins = [...pins];
      newPins[index] = "";
      setPins(newPins);
      document.getElementById(`pin${index - 1}`).focus();
    }
  };

  return (
    !checkPin && (
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
            <h2 style={{ color: "white" }}>Create Your Pin Code</h2>
          </div>
          <div
            style={{
              display: "flex",
              width: "70%",
              justifyContent: "space-evenly",
            }}
          >
            {pins.map((pin, index) => (
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
                  value={pin}
                  id={`pin${index}`}
                  maxLength="1"
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                ></input>
              </div>
            ))}
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
            <span>Submit</span>
          </div>
        </div>
      </div>
    )
  );
}
export default PinComponent;
