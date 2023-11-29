import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import App from "./page/common/App";
import Login from "./page/common/Login";
import ForgetPassword from "./page/common/ForgerPassword";
import Register from "./page/common/Register";
import MyAccount from "./page/user/MyAccount";
import Users from "./page/admin/Users";
import ErrorPage from "./page/common/ErrorPage";
import UploadUser from "./page/admin/UploadUser";
import MyPin from "./page/user/MyPin";
import Deposit from "./page/user/Deposit";
import Withdraw from "./page/user/Withdraw";
import Transfer from "./page/user/Transfer";
import Dashboard from "./page/user/Dashboard";
import { useEffect, useState } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import WebSocketComponent from "./components/WebSocketComponent";

function RouteApp() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  //   useEffect(() => {}, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/a/*"
          element={
            token ? (
              //   <LayoutManager
              //     currentUser={currentUser}
              //     setCurrentUser={setCurrentUser}
              //   >
              <Routes>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UploadUser />} />
              </Routes> //   </LayoutManager>
            ) : (
              <Routes>
                <Route path="*" element={<ErrorPage code={403} />} />
              </Routes>
            )
          }
        />
        <Route
          path="/u/*"
          element={
            token ? (
              //   <LayoutManager
              //     currentUser={currentUser}
              //     setCurrentUser={setCurrentUser}
              //   >
              <>
                <Routes>
                  <Route path="profile" element={<MyAccount />} />
                  <Route path="pin" element={<MyPin />} />
                  <Route path="deposit" element={<Deposit />} />
                  <Route path="withdraw" element={<Withdraw />} />
                  <Route path="transfer" element={<Transfer />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Routes>
                {/* <ScrollToTopButton /> */}
              </>
              //   </LayoutManager>
            ) : (
              <Routes>
                <Route path="*" element={<ErrorPage code={403} />} />
              </Routes>
            )
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Routes>
                <Route path="" element={<App />} />
                <Route path="login" element={<Login setToken={setToken} />} />
                <Route path="register" element={<Register />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="error/:code" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage code={404} />} />
              </Routes>
              {/* <ScrollToTopButton /> */}
            </>
          }
        />
      </Routes>
    </>
  );
}

export default RouteApp;
