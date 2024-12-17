const submitButttonChecker = (data) => {
  return Object.keys(data).some((ele) => {
    return data[ele] === "";
  });
};

const clearButtonChecker = (data) => {
  return Object.keys(data).every((ele) => data[ele] === "");
};
export { submitButttonChecker, clearButtonChecker };
