const convertPathSearchUrl = (property_value) => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  if (Array.isArray(property_value))
    for (const propertyValue of property_value) {
      const property = propertyValue.property;
      let value = propertyValue.value;

      if (value === "" || !value) {
        if (searchParams.has(property)) {
          searchParams.delete(property);
        }
      } else {
        if (searchParams.has(property)) {
          searchParams.set(property, value);
        } else {
          searchParams.append(property, value);
        }
      }
    }
  return `${url.pathname}?${searchParams.toString()}`;
};

export default convertPathSearchUrl;
