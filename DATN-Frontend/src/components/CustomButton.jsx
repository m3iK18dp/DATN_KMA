/* eslint-disable react/prop-types */
function CustomButton({
  field = "",
  IconButton = null,
  size = 40,
  func,
  title = "",
  // 'rgba(255,255,255,0.8)',
  // color = 'rgba(0,0,0,0.8)',
  color = "rgba(255,255,255,0.7)",
  onMouseOverFunc = null,
  onMouseOutFunc = null,
  style = {
    display: "flex",
  },
  id,
  disable = false,
  text = "",
  neon = true,
  colorHover = "rgb(40, 144, 144)",
}) {
  return (
    <div
      style={{ display: "flex", ...style }}
      onClick={() => {
        if (!disable) func(!isNaN(field) ? field : field.toLowerCase());
      }}
      onMouseOver={(e) => {
        e.target.style.cursor = disable ? "not-allowed" : "pointer";
        if (!disable) {
          document.getElementById(`icon-button-${id}-1`).style.color =
            colorHover;
          document.getElementById(`icon-button-${id}-2`).style.color =
            colorHover;
          if (onMouseOverFunc !== null) onMouseOverFunc();
        }
      }}
      onMouseOut={() => {
        document.getElementById(`icon-button-${id}-1`).style.color = color;
        document.getElementById(`icon-button-${id}-2`).style.color = color;
        if (onMouseOutFunc !== null) onMouseOutFunc();
      }}
      title={title}
    >
      {IconButton !== null && (
        <div>
          {" "}
          <IconButton
            id={`icon-button-${id}-1`}
            size={size}
            color={color}
            opacity={!disable ? 1 : 0.4}
          ></IconButton>{" "}
        </div>
      )}
      <div>
        <span
          id={`icon-button-${id}-2`}
          fontSize={size}
          color={color}
          fontWeight="bold"
          style={{ margin: 0, padding: 0 }}
          className={neon ? "neon" : ""}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
export default CustomButton;
