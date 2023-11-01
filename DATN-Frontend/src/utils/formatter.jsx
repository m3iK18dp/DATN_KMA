/* eslint-disable react/prop-types */

function formatCurrency(value) {
  const options = {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  };

  return value.toLocaleString("vi-VN", options);
}

export default { formatCurrency };
