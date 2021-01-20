const { sendSlackMessage } = require("../../slack-message");
const { HTTP } = require("cloudevents");

exports.handler = async (event, context) => {
  const receivedCloudEvent = HTTP.toEvent({
    headers: event.headers,
    body: event.body,
  });

  let message = "";
  let isSuccess = true;
  try {
    isSuccess = true;
    message = `
    Cloud Event Slack Example:
    ============================
    Incoming data
      ${JSON.stringify(receivedCloudEvent.data, null, 2)}
    ============================
    `;
  } catch (err) {
    message = `Error in qualityrtc-slack-message, cloud event[${{
      data: receivedCloudEvent.data,
      source: receivedCloudEvent.source,
      type: receivedCloudEvent.type,
    }}]`;
    isSuccess = false;
    console.log(err.message, err.stack);
  }

  console.log(`muly:index:handler`, { SLACK_QUALITYRTC_WEBHOOK_URL: process.env.SLACK_QUALITYRTC_WEBHOOK_URL});
  const webHookURL = process.env.SLACK_QUALITYRTC_WEBHOOK_URL;

  await sendSlackMessage(webHookURL, {
    username: "qualityrtc-slack-message",
    icon_emoji: isSuccess ? ":recycle:" : ":bangbang:",
    text: message,
  });

  return {
    statusCode: 200,
    body: "OK",
  };
};
