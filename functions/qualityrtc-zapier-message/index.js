const axios = require("axios");

exports.handler = async (event, context) => {
  let message = "";
  try {
    const data = JSON.parse(event.body);
    message = JSON.stringify(data, null, 4);
  } catch (err) {
    message = `Error in testrtc-webhook-director, failed to parse incoming webhook body [${event.body}]`;
  }

  const webHookURL = process.env.MEND_ZAPIER_QUALITYRTC_WEBHOOK_URL;

  const answer = await axios({
    method: "POST",
    url: webHookURL,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    data: message,
  });

  console.log(`muly:qualityrtc-zapier-message v2`, {answer, webHookURL});
  return {
    statusCode: 200,
    body: "OK",
  };
};
