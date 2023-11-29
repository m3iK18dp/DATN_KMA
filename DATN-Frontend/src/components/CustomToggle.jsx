import { useNavigate } from "react-router-dom";

import { VscThreeBars } from "react-icons/vsc";
import { AiFillDashboard } from "react-icons/ai";
import { BiMoneyWithdraw, BiTransferAlt } from "react-icons/bi";
import { RiLuggageDepositFill } from "react-icons/ri";
import { FaKey, FaUser } from "react-icons/fa";
import { useState } from "react";
import "../css/customToggle.css";
import { GiWallet } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";
import authenticationService from "../services/AuthenticationService";
import { toast } from "react-toastify";
function CustomToggle() {
  const navigate = useNavigate();
  const [isCollapse, setIsCollapse] = useState(null);
  const [isCollapseText, setIsCollapseText] = useState(false);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setTimeout(
      () => {
        setIsCollapseText(!isCollapseText);
      },
      isCollapse ? 200 : 0
    );
  };
  const handleLogout = () => {
    authenticationService.logout().then((data) => {
      if (data.status === "ok") {
        navigate("/");
      } else
        toast.error("Logout Failed", {
          autoClose: 1000,
        });
    });
  };
  return (
    <div
      id="toggle"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "black",
        height: "100%",
        padding: "10px",
        width: 260,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      className={
        isCollapse ? "div-collaps" : isCollapse !== null ? "un-div-collaps" : ""
      }
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 85px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          {!isCollapseText && (
            <>
              <GiWallet size={40} color="white"></GiWallet>
              <h3
                style={{
                  margin: 7,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                HyperWallet
              </h3>
            </>
          )}
          <div
            id="button-toggle"
            style={{
              border: "0.5px solid white",
              padding: "2px 5px",
            }}
            className={
              isCollapse
                ? "rotated collaps"
                : isCollapse !== null
                  ? "unRotated collaps"
                  : ""
            }
            onClick={(event) => handleCollapse(event)}
          >
            <VscThreeBars size={30} color="white"></VscThreeBars>
          </div>
        </div>
        <hr style={{ color: "white" }} />
        <div className="div-tab">
          <div
            className={
              (location.pathname === "/u/dashboard" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/dashboard")}
          >
            <div className="tab-icon">
              <AiFillDashboard size={30} color="white"></AiFillDashboard>
            </div>
            {!isCollapseText && <div>DashBoard</div>}
          </div>
          <div
            className={
              (location.pathname === "/u/deposit" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/deposit")}
          >
            <div className="tab-icon">
              <RiLuggageDepositFill
                size={30}
                color="white"
              ></RiLuggageDepositFill>
            </div>
            {!isCollapseText && <div>Deposit</div>}
          </div>
          <div
            className={
              (location.pathname === "/u/withdraw" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/withdraw")}
          >
            <div className="tab-icon">
              <BiMoneyWithdraw size={30} color="white"></BiMoneyWithdraw>
            </div>
            {!isCollapseText && <div>Withdraw</div>}
          </div>
          <div
            className={
              (location.pathname === "/u/transfer" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/transfer")}
          >
            <div className="tab-icon">
              <BiTransferAlt size={30} color="white"></BiTransferAlt>
            </div>
            {!isCollapseText && <div>Transfer</div>}
          </div>
          <div
            className={
              (location.pathname === "/u/pin" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/pin")}
          >
            <div className="tab-icon">
              <FaKey size={30} color="white"></FaKey>
            </div>
            {!isCollapseText && <div>User Pin</div>}
          </div>
          <div
            className={
              (location.pathname === "/u/profile" ? "active" : "") + " tab"
            }
            onClick={() => navigate("/u/profile")}
          >
            <div className="tab-icon">
              <FaUser size={30} color="white"></FaUser>
            </div>
            {!isCollapseText && <div>User Profile</div>}
          </div>
          {localStorage.getItem("role") === "ADMIN" && (
            <>
              <hr style={{ color: "white" }} />
              <div>
                <div>
                  <div></div>
                  <div>User Management</div>
                </div>
                <div>
                  <div></div>
                  <div>Query to Fabric</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <hr style={{ color: "white" }}></hr>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 0,
            backgroundColor: "red",
            borderRadius: 5,
            color: "white",
          }}
          className=" tab"
          onClick={() => handleLogout()}
        >
          <div
            className="tab-icon"
            style={{ marginLeft: "15px", marginRight: "5px" }}
          >
            <PiSignOut size={30}></PiSignOut>
          </div>
          {!isCollapseText && <div>Logout</div>}
        </div>
      </div>
    </div>
  );
}

export default CustomToggle;
