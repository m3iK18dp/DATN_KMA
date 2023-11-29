/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import userService from "../../services/UserService";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillSave } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import NavbarComponent from "../../components/NavbarComponent";
import LastUpdateTimeComponent from "../../components/LastUpdateTimeComponent";
import CustomFormGroup from "../../components/CustomFormGroup";
import { checkToken } from "../../services/CheckToken";
import MySelect from "../../components/MySelect";
import { toast } from "react-toastify";

function UploadUser() {
  const id = useParams();
  const navigate = useNavigate();
  const roles = sessionStorage.getItem("roles");
  const isAdmin = roles !== null ? roles.includes("ADMIN") : false;
  const createOrUpdate = isNaN(id.id)
    ? id.id === "new"
      ? "Create"
      : "Error"
    : id.id > 0
      ? "Update"
      : "Error";
  const [firstNameIsFilled, setFirstNameIsFilled] = useState("");
  const [lastNameIsFilled, setLastNameIsFilled] = useState("");
  const [emailIsFilled, setEmailIsFilled] = useState("");
  const [rolesCheckIsFilled, setRolesCheckIsFilled] = useState("");
  const [status, setStatus] = useState("");
  const [allRoles, setAllRoles] = useState([]);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    status: 1,
    roleIds: [],
  });
  const set = (prop, value) => {
    setUser({ ...user, [prop]: value });
  };
  const [isFirst, setIsFirst] = useState(true);
  const [checkForm, setCheckForm] = useState(true);
  const [inProcessing, setInProcessing] = useState(false);

  useEffect(() => {
    if (createOrUpdate === "Error") navigate("/error/404");
    checkToken(navigate);
    if (!isAdmin) navigate("/error/403");
    if (createOrUpdate === "Update")
      userService.get({ _id: id.id }, navigate).then((data) => {
        setUser(data.data.content[0]);
      });
    userService
      .getRoles({}, navigate)
      .then((data) => setAllRoles(data.data.content));
  }, [createOrUpdate, id.id]);
  useEffect(() => {
    setCheckForm(true);
    const validateInput = (field, maxLength, message = "", type = 0) => {
      if (type && field.length === 0) {
        setCheckForm(false);
        return !isFirst ? message : "";
      }
      if (field.length > maxLength) {
        setCheckForm(false);
        return `You have exceeded the allowed number of characters ${field.length}/${maxLength}`;
      }
      return "";
    };
    setFirstNameIsFilled(
      validateInput(user.firstName, 40, `Please enter first name`, 1)
    );
    setLastNameIsFilled(
      validateInput(user.lastName, 10, `Please enter last name`, 1)
    );
    setEmailIsFilled(validateInput(user.email, 50, "Please enter email", 1));
    setRolesCheckIsFilled(
      validateInput(user.roleIds, Infinity, "Please select roles", 1)
    );
  }, [user, isFirst, status]);
  useEffect(() => {
    setStatus("");
  }, [user]);

  function handleSubmit() {
    setIsFirst(false);
    if (checkForm) {
      setStatus("Please wait...Updating user is in progress");
      setInProcessing(true);
      (createOrUpdate === "Create"
        ? userService.insertUser(user, navigate)
        : userService.updateUser(user.id, user, navigate)
      ).then((res) => {
        if (res.status === "ok") {
          setStatus("");
          toast.success(`${createOrUpdate} User successful!`, {
            autoClose: 1000,
          });
          navigate("/a/users");
        } else if (res.status === "failed") {
          setStatus(`${createOrUpdate} User failed, try again.`);
        } else {
          setStatus(res.message);
        }
        setInProcessing(false);
      });
    } else setStatus("Failed. Please check information entered.");
  }

  return (
    <>
      <NavbarComponent disabled={inProcessing} />
      <div className="background-container" />
      <div className=" background-container-opacity-low" />
      <Container
        style={{
          margin: "50px auto",
        }}
      >
        <Row
          className="col-md-8 offset-md-2"
          style={{
            margin: "100px auto",
            border: "3px solid purple",
            width: "70%",
            minWidth: 350,
            maxWidth: 400,
            borderRadius: 10,
          }}
        >
          <div
            className="card"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <h1
              className="text-center neon"
              style={{
                borderBottom: "2px solid purple",
                padding: "20px",
                marginBottom: "0",
              }}
            >
              {`${createOrUpdate} User`}{" "}
            </h1>
            <div className="card-body">
              <Form>
                {createOrUpdate === "Update" && (
                  <CustomFormGroup
                    funcEnter={handleSubmit}
                    controlId="id"
                    label="ID"
                    value={user.id}
                    readonly={true}
                  />
                )}
                <Col>
                  <CustomFormGroup
                    formGroupStyle={{ width: "100%", marginRight: 20 }}
                    funcEnter={handleSubmit}
                    controlId="firstName"
                    func={set}
                    placeholder="Enter first name"
                    label="First Name"
                    value={user.firstName}
                    warning={firstNameIsFilled}
                    readonly={inProcessing}
                  />
                  <CustomFormGroup
                    funcEnter={handleSubmit}
                    controlId="lastName"
                    func={set}
                    placeholder="Enter last name"
                    label="Last Name"
                    value={user.lastName}
                    warning={lastNameIsFilled}
                    readonly={inProcessing}
                  />
                </Col>
                <div>
                  <CustomFormGroup
                    funcEnter={handleSubmit}
                    controlId="email"
                    func={set}
                    placeholder="Enter email"
                    label="Email"
                    value={user.email}
                    warning={emailIsFilled}
                    readonly={inProcessing}
                  />
                </div>
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Switch
                    style={{
                      color: user.status ? "green" : "red",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                    label={user.status ? "Enabled" : "Disabled"}
                    name="status"
                    checked={user.status}
                    onChange={() => {
                      set("status", !user.status);
                    }}
                    disabled={inProcessing}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="roles">
                  <Form.Label>Roles</Form.Label>
                  <MySelect
                    check={user.roleIds}
                    setCheck={(value) => set("roleIds", value)}
                    all={allRoles}
                    disabled={inProcessing}
                  />
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "red",
                      margin: 0,
                      fontSize: 12,
                    }}
                  >
                    {rolesCheckIsFilled}
                  </p>
                </Form.Group>
                <div className="box-footer">
                  <Button
                    disabled={inProcessing}
                    onClick={() => handleSubmit()}
                    style={{
                      backgroundColor: "#e9ecef",
                      border: "none",
                      color: "black",
                    }}
                    title="Save"
                  >
                    <AiFillSave size={30}></AiFillSave>Save
                  </Button>
                  <Button
                    disabled={inProcessing}
                    variant="danger"
                    // href="/users"
                    onClick={() => navigate("/a/users")}
                    style={{
                      backgroundColor: "#e9ecef",
                      border: "none",
                      color: "black",
                      marginLeft: 20,
                    }}
                  >
                    <MdCancel size={30}></MdCancel>Cancel
                  </Button>
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "red",
                      margin: 0,
                      fontSize: 12,
                    }}
                  >
                    {status}
                  </p>
                  {createOrUpdate === "Update" && (
                    <LastUpdateTimeComponent date={user.lastUpdate} />
                  )}
                </div>{" "}
              </Form>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default UploadUser;
