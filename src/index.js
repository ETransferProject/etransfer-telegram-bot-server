const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");

const bot = new TelegramBot(config.botToken, {
  polling: false,
});
// {
// 	polling: true,
// 	request: {
// 	  url: undefined,
// 	  proxy: "http://127.0.0.1:7890",
// 	},
// }

const app = express();
app.use(bodyParser.json());

const serviceUrl = config.serviceUrl;
const webhookPath = "/bot-server/path-to-webhook";
const webhookUrl = `${serviceUrl}${webhookPath}`;
console.log("serviceUrl:", serviceUrl);
console.log("webhookUrl:", webhookUrl);

bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      "Your Universal Gateway to Seamless Transfers Securely between aelf and beyond.\n \nJoin [Our channel](https://t.me/etransferofficial) to receive updates and promotions:",
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "💳 Deposit",
                web_app: {
                  url: config.depositUrl,
                },
              },
              {
                text: "💵 Withdraw",
                web_app: {
                  url: config.withdrawUrl,
                },
              },
            ],
            [
              {
                text: "🗒 History",
                web_app: {
                  url: config.historyUrl,
                },
              },
              {
                text: "📊 Info",
                web_app: {
                  url: config.infoUrl,
                },
              },
            ],
            [
              {
                text: "💬 Support",
                url: "https://t.me/etransfer_support",
              },
              {
                text: "🔗 Website",
                url: config.websiteUrl,
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error("onText error", error);
  }
});

async function clearWebhook() {
  try {
    await bot.setWebHook();
    console.log("Webhook cleared");
  } catch (error) {
    console.error("Error clearing webhook:", error);
  }
}

async function setWebhook() {
  try {
    const res = await bot.setWebHook(webhookUrl, {
      max_connections: 1000,
      drop_pending_updates: true,
      allowed_updates: [
        "message",
        "callback_query",
        "inline_query",
        "chosen_inline_result",
        "edited_message",
        "channel_post",
        "edited_channel_post",
        "poll",
        "my_chat_member",
        "chat_member",
        "poll_answer",
        "chat_join_request",
      ],
    });
    console.log(`res:${res} Webhook set to ${webhookUrl}`);
  } catch (error) {
    console.error("Error setting webhook:", error);
  }
}

app.post(webhookPath, (req, res) => {
  try {
    console.log("==request", req?.body?.message?.text);
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook update:", error);
    res.sendStatus(500);
  }
});

app.get("/bot-server/test", (req, res) => {
  res.send("work!");
});

app.listen(3333, async () => {
  console.log("Webhook server is listening on port 3333");
  await clearWebhook();
  setWebhook();
});

module.exports = app;
