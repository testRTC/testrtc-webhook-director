const { sendSlackMessage } = require("../../slack-message");

exports.handler = async (event, context) => {
  let message = "";
  let isSuccess = true;
  try {
    const data = JSON.parse(event.body);
    isSuccess = data.status === "completed";
    message = `slack-message-director Example: 
    Test Name:${data.testName}
    Status:${data.status}
    Link:${data.resultUrl}

    ============================
    Incoming data ${JSON.stringify(data, null, 2)}
    ============================    
    `;
  } catch (err) {
    message = `Error in slack-message-director, failed to parse incoming webhook body [${event.body}]`;
    isSuccess = false;
  }

  console.log(`muly:slack-message-director:handler`, { message });

  const webHookURL = isSuccess
    ? process.env.SLACK_WEBHOOK_URL_SUCCESS
    : process.env.SLACK_WEBHOOK_URL_FAILURE;

  await sendSlackMessage(webHookURL, {
    username: "slack-message-director",
    icon_emoji: isSuccess ? ":recycle:" : ":bangbang:",
    text: message,
  });

  return {
    statusCode: 200,
    body: "OK",
  };
};
