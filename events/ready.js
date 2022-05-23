const client = require("../index");
const { getTime } = require("../utils/functions");

client.on("ready", () => {
  client.user.setActivity("axolotls.", { type: "WATCHING" });

  console.log(`${getTime()} Logged in as ${client.user.tag}.`);
});
