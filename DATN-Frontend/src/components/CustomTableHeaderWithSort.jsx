/* eslint-disable react/prop-types */
import { BsSortAlphaUpAlt, BsSortAlphaDownAlt } from "react-icons/bs";
function CustomTableHeaderWithSort({
  get,
  field,
  fieldSort,
  func,
  IconAsc = BsSortAlphaUpAlt,
  IconDesc = BsSortAlphaDownAlt,
}) {
  return (
    <th key={fieldSort} onClick={() => func(fieldSort)}>
      {field}
      {get("field") === fieldSort &&
        (get("type_sort") === "asc" ? (
          <IconAsc size={15} style={{ marginLeft: "2px", display: "inline" }} />
        ) : (
          <IconDesc
            size={15}
            style={{ marginLeft: "2px", display: "inline" }}
          />
        ))}
    </th>
  );
}
export default CustomTableHeaderWithSort;
