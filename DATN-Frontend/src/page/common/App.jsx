import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavbarComponent from "../../components/NavbarComponent";
import { checkToken } from "../../services/CheckToken";
import bg from "../../assets/images/digital-wallet-bg.jpg"
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate, 0);
    if (localStorage.getItem("token")) navigate("/u/dashboard");
  });
  return (
    <>
      <NavbarComponent />
      <Container className="background-image" fluid="true" style={{ paddingTop: "200px", display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", fontSize: "4rem" }} className="text-center">Welcome to the Hyper Wallet</h1>
          {/* <p style={{ color: "white", fontSize: "2rem" }} className="text-center">
              Please <Link style={{ color: "green" }} to="/register">register</Link> or{" "}
              <Link style={{ color: "green" }} to="/login">login</Link> to continue.
            </p> */}
        </div>
        {/* <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", gap: "50px", padding: "0 100px 50px 100px" }}>
          <div style={{ height: "300px", backgroundColor: "white", borderRadius: "5px", border: "1px solid black" }}>
            <div>
              <div></div>
              <div>Secure Transaction</div>
            </div>
            <div>
              <p>Your transactions are secured using the latest encryption technologies to protect your financial data.</p>
            </div>
          </div>
          <div style={{ height: "300px", backgroundColor: "white", borderRadius: "5px", border: "1px solid black" }}>
            <div>
              <div></div>
              <div>Easy Fund Management</div>
            </div>
            <div>
              <p>Manage your funds with ease using our intuitive and user-friendly banking interface.</p>
            </div>
          </div>
          <div style={{ height: "300px", backgroundColor: "white", borderRadius: "5px", border: "1px solid black" }}>
            <div>
              <div></div>
              <div> Multi-User Support</div>
            </div>
            <div>
              <p>Our banking portal supports multiple users, making it perfect for families and businesses.</p>
            </div>
          </div>
          <div style={{ height: "300px", backgroundColor: "white", borderRadius: "5px", border: "1px solid black" }}>
            <div>
              <div></div>
              <div>Transaction History</div>
            </div>
            <div>
              <p>Keep track of your transaction history with detailed records and real-time updates.  </p>
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
}
export default App;
