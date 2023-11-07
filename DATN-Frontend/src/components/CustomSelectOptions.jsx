/* eslint-disable react/prop-types */
import { useState } from "react";
import "../css/customSelectOptions.css";
function CustomSelectOptions({ label, listOption = [], set, current, style = { width: "100%" }, styleSelect = {}, styleOptions = {}, styleOption = {}, radius = 0 }) {
  const [showSelect, setShowSelect] = useState(false);
  return (
    <div
      className="form-group"
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        ...style
      }}
    >
      <div className="group-label" style={{ width: "20%" }}>
        <label>{label}: </label>
      </div>
      <div
        className="group-input required"
        style={{ ...style, position: "relative" }}
      >
        <div
          className="select-cus"
          id={label}
          style={{
            width: "150px",
            height: "45px",
            border: "1px solid rgba(0,0,0,0.5)",
            display: "inline-block",
            borderRadius: "5px",
            padding: "10px",
            color: "rgba(0,0,0,0.7)",
            ...styleSelect, borderRadius: radius
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
          onClick={() => {
            setShowSelect(!showSelect);
          }}
        >
          <div
            style={{
              display: "flex",
              height: "25px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  display: "inline-block",
                  fontSize: "20px",
                }}
                key={current?.accountNumber}
                value={current?.accountNumber}
              >
                {current?.accountNumber}
              </span>
            </div>
          </div>
          {showSelect && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                left: "0px",
                backgroundColor: "white",
                maxHeight: "200px",
                overflowY: "auto",
                overflowX: "hidden",
                ...styleOptions,
                borderRadius: radius
              }}
              className="select-option"
            >
              {listOption.map((item, index) => (
                // <div
                //   key={index}
                //   onClick={() => {
                //     set(item);
                //     setShowSelect(!showSelect);
                //   }}
                //   style={{ padding: 0, position: "unset", ...styleOption }}
                // >
                <div
                  key={index}
                  onClick={() => {
                    set(item);
                    setShowSelect(!showSelect);
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                    e.currentTarget.style.backgroundColor =
                      "rgba(220,220,220,1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,1)";
                  }}
                  style={{
                    textAlign: "center", ...styleOption,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "16px",
                    }}
                    key={item.accountNumber}
                    value={item.accountNumber}
                  >
                    {item.accountNumber}
                  </span>
                </div>
                // </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
export default CustomSelectOptions;
