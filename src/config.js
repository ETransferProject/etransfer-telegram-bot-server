const NETWORK_ENV = process.env.BUILD_ENV;

const configMap = {
  mainnet: {
    appUrl: "https://app.etransfer.exchange",
    depositUrl: "https://app.etransfer.exchange/?type=Deposit",
    withdrawUrl: "https://app.etransfer.exchange/?type=Withdraw",
    historyUrl: "https://app.etransfer.exchange/?type=History",
    infoUrl: "https://app.etransfer.exchange/?type=Info",
    websiteUrl: "https://etransfer.exchange",
    communityUrl: "https://t.me/etransferofficial",
    xUrl: "https://x.com/ETransfer_Web3",
    botToken: process.env.TELEGRAM_BOT_TOKEN_MAINNET,
    serviceUrl: "https://etransfer.exchange",
  },
  testnet: {
    appUrl: "https://test-app.etransfer.exchange",
    depositUrl: "https://test-app.etransfer.exchange/?type=Deposit",
    withdrawUrl: "https://test-app.etransfer.exchange/?type=Withdraw",
    historyUrl: "https://test-app.etransfer.exchange/?type=History",
    infoUrl: "https://test-app.etransfer.exchange/?type=Info",
    websiteUrl: "https://testhome.etransfer.exchange",
    communityUrl: "https://t.me/etransferofficial",
    xUrl: "https://x.com/ETransfer_Web3",
    botToken: process.env.TELEGRAM_BOT_TOKEN_TESTNET,
    serviceUrl: "https://test.etransfer.exchange",
  },
};

module.exports = configMap[NETWORK_ENV];
