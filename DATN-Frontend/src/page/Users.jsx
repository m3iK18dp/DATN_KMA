/* eslint-disable react-hooks/exhaustive-deps */
import "../css/users.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import {
  BsSortNumericUpAlt,
  BsSortAlphaUpAlt,
  BsSortNumericDownAlt,
  BsSortAlphaDownAlt,
  BsArrowsExpand,
} from "react-icons/bs";
import { RiUserSearchLine } from "react-icons/ri";
import { MdCancel, MdOutlineSearchOff } from "react-icons/md";
import PaginationComponent from "../components/PaginationComponent";
import NavbarComponent from "../components/NavbarComponent";
import userService from "../services/UserService";
import convertPathSearchUrl from "../services/ConvertPathSearchUrl";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomTableHeaderWithSort from "../components/CustomTableHeaderWithSort";
import { checkToken } from "../services/CheckToken";
import MySelect from "../components/MySelect";
import CustomContextMenuUser from "../components/contextMenu/CustomContextMenuUsers";
import { toast } from "react-toastify";

function Users() {
  const navigate = useNavigate();
  const roles = sessionStorage.getItem("roles");
  const isAdmin = roles !== null ? roles.includes("ADMIN") : false;
  const path = useLocation().search;
  const [search, setSearch] = useState({
    id: "",
    email: "",
    name: "",
    role_ids: [],
    status: "",
    page: 0,
    limit: 10,
    field: "id",
    type_sort: "asc",
    totalPages: 1,
    currentUsers: [],
    roles: [],
  });
  const get = (field) => {
    return search[field];
  };
  const set = (field, value) => {
    setSearch((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const [expandFilter, setExpandFilter] = useState(false);
  useEffect(() => {
    checkToken(navigate);
    if (!isAdmin) navigate("/error/403");
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    [
      "id",
      "email",
      "name",
      "role_ids",
      "status",
      "page",
      "limit",
      "field",
      "type_sort",
    ].forEach((prop) => {
      const value = searchParams.get(prop);
      if (value !== null) {
        if (!(prop === "id" && value < 1))
          search[prop] =
            prop === "page"
              ? parseInt(value) - 1
              : prop === "role_ids"
              ? value.split(",").map(Number)
              : value;
      }
      params[`_${prop}`] =
        prop === "id" ? (get(prop) > 0 ? get(prop) : -1) : get(prop);
    });

    userService.getRoles({}, navigate).then((data) => {
      set("roles", data.data.content);
    });

    userService.get(params, navigate).then((data) => {
      set("totalPages", data.data.totalPages);
      set("currentUsers", data.data.content);
    });
  }, [path]);
  useEffect(() => {
    handleSearch();
  }, [search.role_ids, search.status]);
  const covertArrayObjectToString = (roles) => {
    if (roles) return roles.map((role) => (role ? role.name : null)).join(", ");
    return "";
  };
  const changeStatus = (id) => {
    const user = get("currentUsers").find((user) => user.id === id);
    userService.changeStatusUser(id, navigate).then((res) => {
      if (res.status === "ok") {
        user.status = !user.status;
        navigate(convertPathSearchUrl());
      }
    });
  };
  const handleResetPassword = (id) => {
    userService.resetPasswordUser(id, navigate).then((res) => {
      if (res.status === "ok") {
        toast.success("Reset Password for user have " + id + " success", {
          autoClose: 1000,
        });
      } else
        toast.error("Reset Password for user have " + id + " failed", {
          autoClose: 1000,
        });
    });
  };
  const handleSearch = () => {
    const search = [];
    ["id", "email", "name", "role_ids", "status"].forEach((field) => {
      search.push({
        property: field,
        value: get(field),
      });
    });
    navigate(convertPathSearchUrl(search));
  };
  const handleCancelSearch = (searchField) => {
    const search = [];
    (searchField === "all"
      ? ["id", "email", "name", "role_ids", "status", "field", "type_sort"]
      : [searchField]
    ).forEach((field) => {
      set(
        field,
        {
          id: "",
          email: "",
          name: "",
          role_ids: [],
          status: "",
          field: "id",
          type_sort: "asc",
        }[field]
      );
      search.push({ property: field, value: "" });
    });
    navigate(convertPathSearchUrl(search));
  };
  // const handleNewUser = () => {
  // 	navigate('/users/new');
  // };
  const handleUpdateUser = (id) => {
    navigate(`/users/${id}`);
  };
  const handleSort = (field) => {
    navigate(
      convertPathSearchUrl([
        { property: "field", value: field },
        {
          property: "type_sort",
          value:
            get("field") !== field
              ? "asc"
              : get("type_sort") === "asc"
              ? "desc"
              : "asc",
        },
      ])
    );
  };
  const handleExpandFilter = () => {
    setExpandFilter(!expandFilter);
  }; /////////////////
  const [contextMenuPosition, setContextMenuPosition] = useState({
    visible: false,
    playlists: [],
  });

  const handleContextMenu = (event, id, status) => {
    if (id !== -1) {
      event.stopPropagation();
    }
    event.preventDefault();
    setContextMenuPosition({
      x: event.pageX,
      y: event.pageY,
      id: id,
      navigate: navigate,
      handleChangeStatus: changeStatus,
      handleResetPassword: handleResetPassword,
      handleUpdateUser: handleUpdateUser,
      status: status,
      visible: true,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition({
      visible: false,
      playlists: [],
    });
  };
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onClick={handleCloseContextMenu}
      onContextMenu={(event) => handleContextMenu(event, -1, true)}
    >
      {/* /////////////////////////////////////// */}
      {contextMenuPosition.visible && (
        <CustomContextMenuUser {...contextMenuPosition} />
      )}
      <NavbarComponent />
      <div className="background-container " />
      <div className=" background-container-opacity-low" />

      <Container
        fluid="true"
        style={{
          position: "fixed",
          top: 55,
          left: 0,
          right: 0,
          // zIndex: 9,
          padding: "5px 30px",
          backgroundColor: "#f8f9fa",
          minWidth: 450,
        }}
        className={`background-color filter-container ${
          expandFilter ? "expanded-no-admin" : ""
        }`}
      >
        <Form
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: 5,
          }}
        >
          <Row>
            {["Id", "Email", "Name"].map((field) => (
              <React.Fragment key={field}>
                <CustomInput
                  set={set}
                  get={get}
                  field={field}
                  type={field === "Id" ? "number" : "text"}
                  min={field === "Id" ? 1 : "none"}
                  func={handleSearch}
                  size={2}
                />
                <Col className="col" xl={1}>
                  <CustomButton
                    field={field}
                    IconButton={MdCancel}
                    func={handleCancelSearch}
                    title={`Cancel Search with ${field}`}
                    id={`${field}-filter`}
                  />
                </Col>
              </React.Fragment>
            ))}
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col xs={1}>
              <Form.Label style={{ color: "white" }}>Role</Form.Label>
            </Col>
            <Col xs={4}>
              <MySelect
                check={search.role_ids}
                setCheck={(value) => set("role_ids", value)}
                all={search.roles}
              />
            </Col>
            <Col xs={1}></Col>
            <Col xs={1}>
              <Form.Label style={{ color: "white" }}>Status</Form.Label>
            </Col>
            <Col xs={4}>
              {["1", "0", ""].map((status) => (
                <div key={`status_${status}`}>
                  <Form.Check
                    style={{ color: "white" }}
                    type="radio"
                    label={
                      status === "1"
                        ? "Enabled"
                        : status === "0"
                        ? "Disabled"
                        : "None"
                    }
                    name="status"
                    value={status}
                    checked={status === get("status")}
                    onChange={(event) =>
                      event.target.checked
                        ? set("status", event.target.value)
                        : ""
                    }
                  />
                </div>
              ))}
            </Col>
          </Row>
          <Row style={{ marginTop: 15 }}>
            <Col />
            {/* <Col /> */}
            <Col>
              <label className="neon" style={{ color: "white" }}>
                Search
              </label>
              <CustomButton
                IconButton={RiUserSearchLine}
                func={handleSearch}
                title={"Search User"}
                id="search"
              />
            </Col>
            <Col>
              <label className="neon" style={{ color: "white" }}>
                Cancel Search
              </label>
              <CustomButton
                field="all"
                IconButton={MdOutlineSearchOff}
                func={handleCancelSearch}
                title={"Cancel Search All filter"}
                id="cancel"
                size={50}
              />
            </Col>
            {/* <Col>
							<CustomButton
								IconButton={AiOutlineUserAdd}
								func={handleNewUser}
								title={'Add new User'}
								id='new'
							/>
						</Col> */}
            {/* <Col /> */}
            <Col />
          </Row>
        </Form>
        <CustomButton
          style={{ position: "absolute", top: "85%", right: "5%" }}
          IconButton={BsArrowsExpand}
          color={"rgba(255,255,255,0.8)"}
          size={20}
          func={() => handleExpandFilter()}
          id="expand-filter"
          title={expandFilter === 55 ? "Expand Filter" : "UnExpanded Filter"}
        />
      </Container>
      <Container
        style={{
          marginTop: 250,
          overflowX: "auto",
        }}
        className={`filter-container ${
          expandFilter ? "expanded-no-admin" : ""
        }`}
      >
        <Table style={{}} striped bordered>
          <thead className="table-dark">
            <tr>
              {[
                {
                  field: "ID",
                  icon: [BsSortNumericUpAlt, BsSortNumericDownAlt],
                },

                {
                  field: "FirstName",
                  icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                },
                {
                  field: "LastName",
                  icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                },
                {
                  field: "Email",
                  icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                },
              ].map((row) => {
                return (
                  <CustomTableHeaderWithSort
                    get={get}
                    key={row.field}
                    field={row.field}
                    func={handleSort}
                    IconAsc={row.icon[0]}
                    IconDesc={row.icon[1]}
                  />
                );
              })}
              <th className="column-">Roles</th>
              <th className="column-">Status</th>
              {/* <th className='column-'>Actions</th> */}
            </tr>
          </thead>
          {get("currentUsers").length !== 0 && (
            <tbody>
              {get("currentUsers").map((user) => (
                <tr
                  key={user.id}
                  onContextMenu={(event) => {
                    if (user.id === 1) event.preventDefault();
                    else handleContextMenu(event, user.id, user.status);
                  }}
                >
                  <td>{user.id}</td>

                  <td style={{ textAlign: "left" }}>{user.firstName}</td>
                  <td style={{ textAlign: "left" }}>{user.lastName}</td>
                  <td style={{ textAlign: "left" }}>{user.email}</td>
                  <td>
                    {covertArrayObjectToString(
                      search.roles.filter((role) =>
                        user.roleIds.includes(role.id)
                      )
                    )}
                  </td>
                  <td
                    style={{
                      color: user.status ? "green" : "red",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    {user.status ? "ENABLED" : "DISABLED"}
                  </td>
                  {/* <td>
										{!user.status ? (
											<CustomButton
												field={user.id}
												IconButton={RiUserUnfollowLine}
												size={30}
												func={changeStatus}
												title={'Disable User'}
												id={`td-status-disable-${user.id}`}
												disable={user.id === 1}
											/>
										) : (
											<CustomButton
												field={user.id}
												IconButton={RiUserFollowLine}
												size={30}
												func={changeStatus}
												title={'Enable User'}
												id={`td-status-enable-${user.id}`}
												disable={user.id === 1}
											/>
										)}
									</td> */}
                  {/* <td>
										<CustomButton
											field={user.id}
											IconButton={MdLockReset}
											size={30}
											func={handleResetPassword}
											title={'Reset Password for User'}
											id={`reset-password-${user.id}`}
											disable={user.id === 1}
										/>
										<CustomButton
											field={user.id}
											IconButton={RiUserSettingsLine}
											size={30}
											func={handleUpdateUser}
											title={'Edit User'}
											id={`edit-${user.id}`}
											disable={user.id === 1}
										/>
									</td> */}
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {get("currentUsers").length === 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              color: "white",
            }}
          >
            Empty search user list
          </div>
        )}
      </Container>
      <div style={{ visibility: "hidden", height: 50 }} />
      <Row>
        <PaginationComponent
          currentPage={get("page")}
          totalPages={get("totalPages")}
          objectsPerPage={get("limit")}
        />
      </Row>
    </div>
  );
}

export default Users;
