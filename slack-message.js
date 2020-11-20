const axios = require("axios");

exports.sendSlackMessage = async (url, messageBody) => {
  return axios({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: JSON.stringify(messageBody),
  });
};
