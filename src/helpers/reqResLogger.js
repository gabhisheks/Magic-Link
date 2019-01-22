module.exports = ({
  api,
  apiParams = [],
  loggerFunction
}) => {
  return api(...apiParams)
    .then(result => {
      loggerFunction(apiParams, result);
      return result;
    }).catch(error => {
      loggerFunction(apiParams, error);
      return error;
    });
};
