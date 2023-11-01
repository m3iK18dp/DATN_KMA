import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import { checkToken } from "../services/CheckToken";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate, 0);
    if (localStorage.getItem("token")) navigate("/u/dashboard");
  });
  return (
    <>
      <div className="background-container" />
      <div className=" background-container-opacity-low" />
      <NavbarComponent />
      <Container fluid="true" style={{ paddingTop: 200 }}>
        <h1 className="text-center">Welcome to the Hyper Wallet</h1>
        <p className="text-center">
          Please <Link to="/register">register</Link> or{" "}
          <Link to="/login">login</Link> to continue.
        </p>
      </Container>
    </>
  );
}
export default App;
