/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ErrorPage = ({ code = null }) => {
  const param = useParams();
  if (!code) {
    code = param.code;
  }
  useEffect(() => {
    document.title = "Error Page";
  }, []);
  const errors = {
    400: {
      default: "Bad Request",
      message:
        "We're sorry, but we could not understand your request. Please check your input and try again.",
    },
    401: {
      default: "Unauthorized",
      message:
        "We're sorry, but you're not authorized to access this resource. Please log in or contact the website administrator.",
    },
    403: {
      default: "Forbidden",
      message:
        "We're sorry, but it looks like you're not allowed to access this resource. Please log in with appropriate credentials or contact the website administrator.",
    },
    404: {
      default: "Not Found",
      message:
        "We're sorry, but it seems that the page you're looking for doesn't exist. Please check the URL and try again.",
    },
    408: {
      default: "Request Timeout",
      message:
        "We're sorry, but it looks like the requested time has exceeded the specified time. Please try again later.",
    },
    500: {
      default: "Internal Server Error",
      message:
        "We're sorry, but something went wrong on our end. Please try again later or contact the website administrator.",
    },
    502: {
      default: "Bad Gateway",
      message:
        "We're sorry, but the server encountered a temporary error and could not complete your request. Please try again later.",
    },
    503: {
      default: "Service Unavailable",
      message:
        "We're sorry, but the server is currently unable to handle your request due to maintenance or overload. Please try again later.",
    },
  };

  return (
    <>
      <Container>
        <div className="background-container" />
        <div className=" background-container-opacity-low" />
        <ToastContainer />
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h1>{`${code}: ${errors[code].default}`}</h1>
            <h2 className="my-5">Oops! Something went wrong...</h2>
            <p>{errors[code].message}</p>
            <p>Please check the URL or try refreshing the page.</p>
          </Col>
        </Row>
        <p className="text-center">
          Please <Link to="/">Home</Link> or{" "}
          <Link to="/register">register</Link> or <Link to="/login">login</Link>{" "}
          to continue.
        </p>
      </Container>
    </>
  );
};

export default ErrorPage;
