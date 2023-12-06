import { Pagination, Form } from "react-bootstrap";
import {
  BsFillSkipStartFill,
  BsFillSkipEndFill,
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import convertPathSearchUrl from "../services/ConvertPathSearchUrl";
import CustomButton from "./CustomButton";

function PaginationComponent({ currentPage, totalPages, objectsPerPage }) {
  currentPage += 1;
  const navigate = useNavigate();
  const changePage = (value) => {
    navigate(convertPathSearchUrl([{ property: "page", value: value }]));
  };
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "10px 15px 5px 15px",
        // zIndex: 1,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Pagination style={{ margin: 0 }}>
        {[
          {
            id: "first",
            icon: BsFillSkipStartFill,
            value: 1,
            title: "First Page",
          },
          {
            id: "prev",
            icon: BsFillCaretLeftFill,
            value: currentPage - 1,
            title: "Prev Page",
          },
        ].map((obj) => (
          <CustomButton
            key={obj.id}
            IconButton={obj.icon}
            field={obj.value}
            func={changePage}
            size={20}
            color="white"
            style={{
              height: 35,
              width: 35,
              border: "1px solid #dee2e6",
              borderTopLeftRadius: obj.id === "first" ? "0.375rem" : "0",
              borderBottomLeftRadius: obj.id === "first" ? "0.375rem" : "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disable={currentPage === 1}
            id={obj.id}
            title={obj.title}
          />
        ))}
        {currentPage > 4 && (
          <Form.Label
            key="previous-ellipsis"
            disabled
            style={{
              color: "white",
              height: 35,
              width: 30,
              border: "1px solid #dee2e6",
              backgroundColor: `rgba(255, 255, 255, 0.1)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {"..."}
          </Form.Label>
        )}
        {Array.from({ length: totalPages }).map(
          (_, index) =>
            index >= currentPage - 2 &&
            index <= currentPage + 1 &&
            index >= 0 &&
            index <= totalPages && (
              <Form.Label
                key={index}
                onClick={() => {
                  if (index + 1 !== currentPage)
                    navigate(
                      convertPathSearchUrl([
                        { property: "page", value: index + 1 },
                      ])
                    );
                }}
                onMouseOver={(e) => {
                  if (index + 1 !== currentPage) {
                    e.target.style.cursor = "pointer";
                    e.target.style.color = "rgb(40, 144, 144)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "rgba(255, 255, 255, 1)";
                }}
                style={{
                  color: "white",
                  height: 35,
                  width: 30,
                  border: "1px solid #dee2e6",
                  backgroundColor: `rgba(255, 255, 255, ${index + 1 === currentPage ? 0.5 : 0.1
                    })`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {index + 1}
              </Form.Label>
            )
        )}
        {currentPage < totalPages - 3 && (
          <Form.Label
            key="next-ellipsis"
            disabled
            style={{
              color: "white",
              height: 35,
              width: 30,
              border: "1px solid #dee2e6",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {"..."}
          </Form.Label>
        )}
        {[
          {
            id: "next",
            icon: BsFillCaretRightFill,
            value: currentPage + 1,
            title: "Next Page",
          },
          {
            id: "last",
            icon: BsFillSkipEndFill,
            value: totalPages,
            title: "Last Page",
          },
        ].map((obj) => (
          <CustomButton
            key={obj.id}
            IconButton={obj.icon}
            field={obj.value}
            func={changePage}
            size={20}
            color="white"
            style={{
              height: 35,
              width: 35,
              border: "1px solid #dee2e6",
              borderTopLeftRadius: obj.id === "first" ? "0.375rem" : "0",
              borderBottomLeftRadius: obj.id === "first" ? "0.375rem" : "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disable={currentPage === totalPages}
            id={obj.id}
            title={obj.title}
          />
        ))}
        <Form.Control
          as="select"
          value={objectsPerPage}
          onChange={(event) =>
            navigate(
              convertPathSearchUrl([
                { property: "limit", value: event.target.value },
              ])
            )
          }
          style={{
            height: 35,
            width: 35,
            padding: 0,
            border: "1px solid #dee2e6",
            fontWeight: "bold",
            textAlign: "center",
            borderTopRightRadius: "0.375rem",
            borderBottomRightRadius: "0.375rem",
            borderTopLeftRadius: "0rem",
            borderBottomLeftRadius: "0rem",
            marginLeft: 5,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            fontSize: 20,
            overflow: "hidden",
          }}
        >
          {[5, 10, 20, 50, 100].map((value) => (
            <option
              key={value}
              value={value}
              defaultValue={10}
              style={{
                color: "black",
                // fontWeight: 'bold',
              }}
            >
              {value}
            </option>
          ))}
        </Form.Control>
      </Pagination>

    </div>
  );
}

export default PaginationComponent;
