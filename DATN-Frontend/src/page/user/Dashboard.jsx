/* eslint-disable react-hooks/exhaustive-deps */
import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import {
  BsSortAlphaUpAlt,
  BsSortAlphaDownAlt,
  BsArrowsExpand,
  BsPatchCheckFill,
  BsPatchExclamationFill,
  BsSearch,
} from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";
import PaginationComponent from "../../components/PaginationComponent";
import convertPathSearchUrl from "../../services/ConvertPathSearchUrl";
import CustomButton from "../../components/CustomButton";
import CustomTableHeaderWithSort from "../../components/CustomTableHeaderWithSort";
import { checkToken } from "../../services/CheckToken";
import CustomContextMenu from "../../components/contextMenu/CustomContextMenu";
import CustomToggle from "../../components/CustomToggle";
import transactionService from "../../services/TransactionService";
import TransactionType from "../../components/TransactionType";
import CustomSelectOptions from "../../components/CustomSelectOptions";
import accountService from "../../services/AccountService";
import userService from "../../services/UserService";
import PinComponent from "../../components/PinComponent";
import { ToastContainer } from "react-toastify";
import CustomChart from "../../components/charts/Chart";
import moment from "moment";
import { LuBadgeDollarSign } from "react-icons/lu";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import formatter from "../../utils/formatter";
import WebSocketComponent from "../../components/WebSocketComponent";
function Dashboard() {
  const navigate = useNavigate();
  const prams = useParams();

  const isLoggedIn = localStorage.getItem("token");

  const roles = sessionStorage.getItem("roles");
  const isAdmin = roles !== null ? roles === "ADMIN" : false;
  const location = useLocation();

  const [search, setSearch] = useState({
    keyword: "",
    transaction_type: "",
    account_number: "",
    transaction_time: "",
    class_time: "",
    end_time: "",
    verify: "",
    page: 0,
    limit: 10,
    field: "transactionTime",
    type_sort: "asc",
  });
  const [user, setUser] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [expandFilter, setExpandFilter] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectOption, setSelectOption] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [filterTime, setFilterTime] = useState("time");
  const get = (field) => {
    return search[field];
  };
  const set = (field, value) => {
    setSearch((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const [checkPin, setCheckPin] = useState(null);
  const [params, setParams] = useState({
    _keyword: "",
    _transaction_type: "",
    _account_number: "",
    _transaction_time: "",
    _class_time: "",
    _end_time: "",
    _verify: "",
    _page: 0,
    _limit: 10,
    _field: "transactionTime",
    _type_sort: "asc",
  });

  useEffect(() => {
    if (isFirst) {
      if (selectOption === null) {
        if (accounts.length === 0)
          accountService.get({}, navigate).then((response) => {
            setAccounts(response.data.content);
            if (search.account_number !== "") {
              setSelectOption(
                Array.from(response.data.content).find(
                  (ac) => ac.accountNumber === search.account_number
                )
              );
            } else {
              // search.account_number = response.data.content[0].accountNumber;
              setSelectOption(response.data.content[0]);
            }
          });

        if (checkPin === null)
          userService.checkPin(navigate).then((res) => {
            if (res.status === "ok") setCheckPin(true);
            else setCheckPin(false);
          });

        if (!user?.id)
          userService
            .getUserInformation(navigate)
            .then((response) => setUser(response.data));
      }
      setIsFirst(false);
    }
  }, [selectOption]);
  useEffect(() => {
    if (!isFirst) handleSearch();
    // else setIsFirst(false);
  }, [
    get("transaction_type"),
    get("account_number"),
    get("transaction_time"),
    get("start_time"),
    get("end_time"),
    get("verify"),
    selectOption,
  ]);
  useEffect(() => {
    if (!isFirst) set("account_number", selectOption?.accountNumber);
  }, [selectOption]);
  useEffect(() => {
    checkToken(navigate);
    getTrans()

  }, [window.location.href]);
  const getTrans = () => {
    const searchParams = new URLSearchParams(location.search);
    const currentParams = {};
    [
      { field: "keyword", default: "" },
      { field: "transaction_type", default: "" },
      {
        field: "account_number",
        default: "",
      },
      {
        field: "transaction_time",
        default: "",
      },
      {
        field: "start_time",
        default: "",
      },
      {
        field: "end_time",
        default: "",
      },
      {
        field: "verify",
        default: "",
      },
      { field: "page", default: 0 },
      { field: "limit", default: 10 },
      { field: "field", default: "transactionTime" },
      { field: "type_sort", default: "desc" },
    ].forEach((prop) => {
      const value = searchParams.get(prop.field);
      if (value != null) {
        search[prop.field] =
          prop.field === "page" ? parseInt(value) - 1 : value;
        currentParams[`_${prop.field}`] =
          prop.field === "page" ? parseInt(value) - 1 : value;
      } else search[prop.field] = prop.default;
    });
    setParams(currentParams);
    // if (params._account_number && params._account_number !== "")
    // if (!isFirst)
  }
  useEffect(() => {
    if (search.account_number !== "")
      transactionService.get(params, navigate).then((data) => {
        if (search.account_number !== "") {
          setTotalPages(data.data.totalPages);
          setCurrentTransactions(data.data.content);
        }
      });
  }, [params]);
  const handleSearch = () => {
    const search = [];
    [
      "keyword",
      "transaction_type",
      "account_number",
      "transaction_time",
      "start_time",
      "end_time",
      "verify",
    ].forEach((field) => {
      search.push({
        property: field,
        value:
          (["transaction_time"].includes(field) && filterTime !== "time") ||
            (["start_time", "end_time"].includes(field) && filterTime === "time")
            ? ""
            : get(field),
      });
    });
    navigate(convertPathSearchUrl(search));
  };
  const handleCancelSearch = (searchField) => {
    const search = [];
    (searchField === "all"
      ? [
        "keyword",
        "transaction_type",
        "transaction_time",
        "start_time",
        "end_time",
        "verify",
        "field",
        "type_sort",
      ]
      : [searchField]
    ).forEach((field) => {
      set(
        field,
        {
          keyword: "",
          transaction_type: "",
          transaction_time: "",
          start_time: "",
          end_time: "",
          verify: "",
          field: "transactionTime",
          type_sort: "desc",
        }[field]
      );
      search.push({ property: field, value: "" });
    });
    navigate(convertPathSearchUrl(search));
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
  };
  /////////////////
  const [contextMenuPosition, setContextMenuPosition] = useState({
    id: -1,
    visible: false,
    playlists: [],
  });
  const handleContextMenu = (event, id, type = "transaction") => {
    if (id !== -1 || (id === -1 && type.includes("playlist"))) {
      event.stopPropagation();
    }
    event.preventDefault();
    setContextMenuPosition({
      x: event.pageX,
      y: event.pageY,
      // playlists: playlists,
      // setPlaylists: setPlaylists,
      id: id,
      navigate: navigate,
      // handleAddPlaylist: handleAddPlaylist,
      // handleDeletePlaylist: handleDeletePlaylist,
      // handlePlaySong: handlePlaySong,
      // handleNewSong: handleNewSong,
      // handleUpdateSong: handleUpdateSong,
      // handleDeleteSong: handleDeleteSong,
      // addSongToPlaylist: addSongToPlaylist,
      // deleteSongInPlaylist: deleteSongInPlaylist,
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      location: location,
      prams: prams,
      type: type,
      visible: true,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition({
      visible: false,
      playlists: [],
    });
  };
  const totalBalance = () => {
    let total = 0;
    accounts.forEach((a) => (total += a.balance));
    return total || 1;
  };
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {selectOption?.accountNumber &&
        <WebSocketComponent destination={selectOption.accountNumber} func={getTrans} />
      }
      <PinComponent
        checkPin={checkPin === true || checkPin === null}
        setCheckPin={setCheckPin}
      />
      <CustomToggle></CustomToggle>
      <div
        id="container"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
          flexWrap: "nowrap",
        }}
        onClick={handleCloseContextMenu}
        onContextMenu={(event) => handleContextMenu(event, -1)}
      >
        {contextMenuPosition.visible && (
          <CustomContextMenu {...contextMenuPosition} />
        )}
        <div className="background-container" />
        <div className=" background-container-opacity-low" />
        <ToastContainer />
        <Container
          fluid="true"
          style={{
            // zIndex: 9,
            padding: "5px 30px",
            width: "100%",
            minWidth: 400,
          }}
          className={`background-color-2 filter-container ${expandFilter
            ? isAdmin
              ? "expanded-no-admin"
              : "expanded-admin"
            : ""
            }`}
        >
          <Form
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              padding: 5,
            }}
          >
            <Row>
              <Col
                style={{
                  border: "2px solid black",
                  margin: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  width: "100%",
                  padding: "10px 30px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <h1>Hi, {user.firstName + " " + user.lastName}</h1>
                  <p>Phone Number: {user.phoneNumber}</p>
                  <p>Email: {user.email}</p>
                  <p>Address: {user.address}</p>
                </div>
              </Col>
              <Col
                style={{
                  border: "2px solid black",
                  margin: 10,
                  justifyContent: "flex-start",
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  width: "100%",
                  padding: "10px 30px",
                }}
              >
                <div style={{ width: "100%" }}>
                  <div className="border rounded-md p-2 h-28 flex !justify-around align-center">
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex justify-center items-center  text-xl text-green-800">
                        <LuBadgeDollarSign size={40} />
                      </div>
                      <div className="flex justify-center items-center text-xl text-green-800">
                        {formatter.formatCurrency(selectOption?.balance ?? "")}
                      </div>
                      <div className="flex justify-center items-center text-2xl font-bold text-green-800">
                        Balance
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-center text-2xl font-bold text-green-800">
                      <div className="h-12 w-12">
                        <CircularProgressbar
                          value={(
                            (selectOption?.balance / totalBalance()) *
                            100
                          ).toLocaleString()}
                          styles={buildStyles({
                            pathColor: "#0e9f6e",
                            trailColor: "#a9a4a8",
                            strokeLinecap: "butt",
                            pathTransitionDuration: 1,
                            pathTransitionTimingFunction: "linear",
                          })}
                          strokeWidth={15}
                        />
                      </div>
                      <div className="text-xl italic text-green-800">
                        {(
                          (selectOption?.balance / totalBalance()) *
                          100
                        ).toLocaleString()}
                        %
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CustomSelectOptions
                      label={"Account"}
                      listOption={accounts}
                      set={setSelectOption}
                      current={selectOption}
                    ></CustomSelectOptions>
                    <div style={{ marginLeft: "20%" }}>
                      <p>
                        Status:{" "}
                        <span
                          className={
                            selectOption?.status === "ACTIVE"
                              ? "text-green-700"
                              : "text-red-700"
                          }
                        >
                          {selectOption?.status}
                        </span>
                      </p>
                      <p>
                        Created Time:{" "}
                        <span
                          style={{ fontStyle: "italic", fontWeight: "lighter" }}
                        >
                          {moment(selectOption?.createdTime).format(
                            "MMMM DD, YYYY hh:mm A"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                border: "1px solid black",
                padding: "5px 10px",
                height: 40,
                borderRadius: 5,
                backgroundColor: "#f6f66836",
              }}
            >
              {/* <div
                style={{ marginRight: 20, fontSize: 20 }}
                onClick={() => handleCancelSearch()}
              >
                Clear Filter
              </div> */}
              <CustomButton
                IconButton={MdOutlineSearchOff}
                color={"black"}
                size={30}
                func={() => handleCancelSearch("all")}
                id="cancel-filter"
                text="Clear Filter"
                title={expandFilter === 55 ? "Expand" : "UnExpanded"}
                neon={false}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 20, fontSize: 20 }}>Search</div>
              <div className="group-input-search">
                <div>
                  <input
                    id="search"
                    // style={{ color: "black!important" }}
                    onChange={(e) => set("keyword", e.target.value)}
                    value={search.keyword}
                    placeholder="Enter keyword"
                  ></input>
                </div>
                <div>
                  <label htmlFor="search" onClick={() => handleSearch()}>
                    <BsSearch size={20}></BsSearch>
                  </label>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <div style={{ marginRight: 20, fontSize: 20 }}>
                Transaction Type
              </div>
              <div className="div-select">
                <select
                  value={search.transaction_type}
                  onChange={(e) => {
                    // set("transaction_type", e.target.value);
                    search.transaction_type = e.target.value;
                  }}
                >
                  {[
                    { title: "All", value: "" },
                    { title: "Deposit", value: "DEPOSIT" },
                    { title: "Withdraw", value: "WITHDRAW" },
                    { title: "Transfer/Credited", value: "TRANSFER" },
                  ].map((value, index) => (
                    <option key={index} value={value.value}>
                      {value.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>{" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <div style={{ marginRight: 20, fontSize: 20, display: "flex" }}>
                <select
                  value={filterTime}
                  onChange={(e) => {
                    setFilterTime(e.target.value);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    padding: 5,
                    height: 40,
                  }}
                >
                  {[
                    { title: "Time", value: "time" },
                    { title: "Interval", value: "interval" },
                  ].map((value, index) => (
                    <option key={index} value={value.value}>
                      {value.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="div-time">
                {filterTime === "time" ? (
                  <input
                    type="date"
                    onChange={(e) => set("transaction_time", e.target.value)}
                    value={search.transaction_time}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: " space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>From: </div>
                      <div>
                        <input
                          type="date"
                          onChange={(e) => set("start_time", e.target.value)}
                          value={search.start_time}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: " space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>To: </div>{" "}
                      <div>
                        <input
                          type="date"
                          onChange={(e) => set("end_time", e.target.value)}
                          value={search.end_time}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 20, fontSize: 20 }}>Verify</div>
              <div className="div-checkbox">
                <input
                  type="checkbox"
                  checked={search.verify == "true"}
                  // value={search.verify}
                  onChange={(e) => {
                    search.verify = e.target.checked;
                  }}
                />
              </div>
            </div>
          </div>
          <CustomButton
            style={{ position: "absolute", top: "90%", left: "95%" }}
            IconButton={BsArrowsExpand}
            color={"rgba(255,255,255,0.5)"}
            size={20}
            func={() => handleExpandFilter()}
            id="expand-filter"
            title={expandFilter === 55 ? "Expand" : "UnExpanded"}
          />
        </Container>
        <div
          className={`filter-container ${expandFilter
            ? isAdmin
              ? "expanded-no-admin"
              : "expanded-admin"
            : ""
            }`}
        >
          <div
            style={{
              margin: "0 auto",
              textAlign: "center",
              // marginBottom: "30px",
              padding: "10px 30px",
            }}
          >
            <CustomChart
              transactions={currentTransactions}
              currentAccount={selectOption}
              params={params}
            />
          </div>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignContent: "flex-start",
            padding: 20,
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              width: "100%",
            }}
            className={`filter-container ${expandFilter
              ? isAdmin
                ? "expanded-no-admin"
                : "expanded-admin"
              : ""
              }`}
          >
            <Table
              striped
              bordered
              style={{
                borderWidth: "0px 0",
              }}
            >
              <thead>
                <tr>
                  {[
                    {
                      field: "Transaction Code",
                      fieldSort: "transactionCode",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Amount",
                      fieldSort: "amount",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Sender Account Number",
                      fieldSort: "senderAccountNumber",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Sender Full Name",
                      fieldSort: "senderFullName",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Recipient Account Number",
                      fieldSort: "recipientAccountNumber",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Recipient Full Name",
                      fieldSort: "recipientFullName",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                    {
                      field: "Transaction Time",
                      fieldSort: "transactionTime",
                      icon: [BsSortAlphaUpAlt, BsSortAlphaDownAlt],
                    },
                  ].map((row) => {
                    return (
                      <CustomTableHeaderWithSort
                        get={get}
                        key={row.field}
                        fieldSort={row.fieldSort}
                        field={row.field}
                        func={handleSort}
                        IconAsc={row.icon[0]}
                        IconDesc={row.icon[1]}
                      />
                    );
                  })}
                  <th>Description</th>
                  <th>Transaction Type</th>
                  {search.verify == "true" && <th></th>}
                </tr>
              </thead>
              {currentTransactions.length !== 0 && (
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr
                      onContextMenu={(event) =>
                        handleContextMenu(event, transaction.transactionCode)
                      }
                      key={transaction.transactionCode}
                    >
                      <td>{transaction.transactionCode}</td>
                      <td>{formatter.formatCurrency(transaction.amount)}</td>
                      <td>{transaction.senderAccountNumber}</td>
                      <td>{transaction.senderFullName}</td>
                      <td>{transaction.recipientAccountNumber}</td>
                      <td>{transaction.recipientFullName}</td>
                      <td>
                        {moment(transaction.transactionTime).format(
                          "MMMM DD, YYYY hh:mm A"
                        )}
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {transaction.description}
                      </td>
                      <td>
                        <TransactionType
                          transactionType={
                            accounts.find(
                              (ac) =>
                                ac.accountNumber ===
                                transaction.senderAccountNumber
                            )
                              ? transaction.transactionType
                              : "CREDITED"
                          }
                        />
                      </td>
                      {search.verify == "true" && (
                        <td>
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                            }}
                          >
                            {transaction.verify === true ? (
                              <BsPatchCheckFill
                                color="green"
                                size="20"
                                title="Valid"
                              ></BsPatchCheckFill>
                            ) : (
                              <BsPatchExclamationFill
                                color="red"
                                size="20"
                                title="Invalid"
                              ></BsPatchExclamationFill>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>{" "}
            {currentTransactions.length === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  color: "white",
                }}
              >
                Empty search transaction list
              </div>
            )}
            <div
              style={{
                width: "100%",
              }}
            >
              <PaginationComponent
                currentPage={get("page")}
                totalPages={totalPages === 0 ? 1 : totalPages}
                objectsPerPage={get("limit")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
