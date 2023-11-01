/* eslint-disable react/prop-types */
import { Navbar, Nav } from "react-bootstrap";
import { GiWallet } from "react-icons/gi";
import { PiSignInFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "./CustomButton";
function NavbarComponent({ disabled = false }) {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <Navbar
      variant="light"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: 5,
        height: 55,
        minWidth: 400,
        display: "flex",
        justifyContent: "space-between",
      }}
      className="background-color"
    >
      <Nav.Link
        href="/"
        disabled={location.pathname === "/" || disabled}
        style={{
          borderRight: "solid 1px rgba(255,255,255,0.3)",
          padding: "4px 10px",
        }}
      >
        <GiWallet size={50} color={"rgba(255,255,255,0.6)"}></GiWallet>
        <label style={{ color: "rgba(255,255,255)" }}>HyperWallet</label>
      </Nav.Link>
      <Nav>
        <CustomButton
          className="text-center "
          style={{
            width: 100,
            height: 45,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 10,
            border: "1px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:
              location.pathname !== "/login"
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.3)",
            marginRight: 15,
          }}
          IconButton={PiSignInFill}
          size={20}
          color="white"
          colorHover="rgba(255,255,255,0.5)"
          func={() => navigate("/login")}
          text="Login"
          disable={location.pathname === "/login"}
          id="login"
          neon={false}
        />
        <CustomButton
          className="text-center "
          style={{
            width: 100,
            height: 45,
            textAlign: "center",
            backgroundColor: "rgb(123 160 249 / 40%)",
            borderRadius: 10,
            border: "1px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:
              location.pathname !== "/register"
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.3)",
          }}
          IconButton={FaUserPlus}
          size={20}
          color="white"
          colorHover="rgba(255,255,255,0.5)"
          func={() => navigate("/register")}
          text="Register"
          disable={location.pathname === "/register"}
          id="register"
          neon={false}
        />
      </Nav>
    </Navbar>
  );
}
export default NavbarComponent;
