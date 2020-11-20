const { sendSlackMessage } = require("../../slack-message");

exports.handler = async (event, context) => {
  let message = "";
  let isSuccess = true;
  try {
    const data = JSON.parse(event.body);
    isSuccess = true;
    message = `
    Cloud Event Slack Example:
    ============================
    Incoming data
      ${JSON.stringify(data, null, 2)}
    ============================
    `;
  } catch (err) {
    message = `Error in qualityrtc-slack-message-director, failed to parse incoming webhook body [${event.body}]`;
    isSuccess = false;
  }

  const webHookURL = process.env.SLACK_QUALITYRTC_WEBHOOK_URL;

  await sendSlackMessage(webHookURL, {
    username: "qualityrtc-slack-message-director",
    icon_emoji: isSuccess ? ":recycle:" : ":bangbang:",
    text: message,
  });

  return {
    statusCode: 200,
    body: "OK",
  };
};
