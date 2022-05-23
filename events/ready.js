const client = require("../index");
const { getTime } = require("../utils/functions");

client.on("ready", () => {
  console.log(`${getTime()} Logged in as ${client.user.tag}.`);
});
