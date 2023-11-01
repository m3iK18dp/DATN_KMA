// import ReactDOM from "react-dom/client";
// import "./css/index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./page/App";
// import Login from "./page/Login";
// import Register from "./page/Register";
// import MyAccount from "./page/MyAccount";
// import Users from "./page/Users";
// import ErrorPage from "./page/ErrorPage";
// import UploadUser from "./page/UploadUser";
// import MyPin from "./page/MyPin";
// import Deposit from "./page/Deposit";
// import Withdraw from "./page/Withdraw";
// import Transfer from "./page/Transfer";
// import Dashboard from "./page/Dashboard";
// import ForgetPassword from "./page/ForgerPassword";
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="" element={<App />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forget-password" element={<ForgetPassword />} />
//       <Route
//         path="/users"
//         element={
//           // localStorage.getItem("token") ?
//           <Users />
//           // : <ErrorPage code={405} />
//         }
//       />
//       <Route
//         path="/users/:id"
//         element={
//           // localStorage.getItem("token") ? (
//           <UploadUser />
//           // ) : (
//           //   <ErrorPage code={403} />
//           // )
//         }
//       />
//       <Route
//         path="/user/profile"
//         element={
//           // !localStorage.getItem("token") ? (
//           //   <ErrorPage code={403} />
//           // ) : (
//           <MyAccount />
//           // )
//         }
//       />
//       <Route
//         path="/user/pin"
//         element={
//           // !localStorage.getItem("token") ? <ErrorPage code={403} /> :
//           <MyPin />
//         }
//       />
//       <Route
//         path="/deposit"
//         element={
//           // !localStorage.getItem("token") ? (
//           //   <ErrorPage code={403} />
//           // ) : (
//           <Deposit />
//           // )
//         }
//       />
//       <Route
//         path="/withdraw"
//         element={
//           // !localStorage.getItem("token") ? (
//           //   <ErrorPage code={403} />
//           // ) : (
//           <Withdraw />
//           // )
//         }
//       />
//       <Route
//         path="/transfer"
//         element={
//           // !localStorage.getItem("token") ? (
//           //   <ErrorPage code={403} />
//           // ) : (
//           <Transfer />
//           // )
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           // !localStorage.getItem("token") ? (
//           //   <ErrorPage code={403} />
//           // ) : (
//           <Dashboard />
//           // )
//         }
//       />
//       <Route path="*" element={<ErrorPage code={404} />} />
//       <Route path="/error/:code" element={<ErrorPage />} />
//     </Routes>
//   </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import RouteApp from "./RouteApp";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  </React.StrictMode>
);
