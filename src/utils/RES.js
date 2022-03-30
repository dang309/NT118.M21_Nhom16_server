const RES = (httpCode, message = '', result = '', data) => {
  return {
    status: httpCode,
    message,
    result,
    data,
  };
};

module.exports = {
  RES,
};
