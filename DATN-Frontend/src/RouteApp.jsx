import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import App from "./page/App";
import Login from "./page/Login";
import Register from "./page/Register";
import MyAccount from "./page/MyAccount";
import Users from "./page/Users";
import ErrorPage from "./page/ErrorPage";
import UploadUser from "./page/UploadUser";
import MyPin from "./page/MyPin";
import Deposit from "./page/Deposit";
import Withdraw from "./page/Withdraw";
import Transfer from "./page/Transfer";
import Dashboard from "./page/Dashboard";
import ForgetPassword from "./page/ForgerPassword";
import { useEffect, useState } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
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
                <ErrorPage code={403}></ErrorPage>
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
              <Routes>
                <Route path="profile" element={<MyAccount />} />
                <Route path="pin" element={<MyPin />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route path="transfer" element={<Transfer />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Routes> //   </LayoutManager>
            ) : (
              <Routes>
                <ErrorPage code={403}></ErrorPage>
              </Routes>
            )
          }
        />
        <Route
          path="/*"
          element={
            <Routes>
              <Route path="" element={<App />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="error/:code" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage code={404} />} />
            </Routes>
          }
        />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default RouteApp;
