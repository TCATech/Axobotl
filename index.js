const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client({
  intents: 32767,
  ws: { properties: { $browser: "Discord iOS" } },
  restTimeOffset: 0,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    activities: [
      {
        name: "subs.nottca.tk",
        type: "WATCHING",
      },
    ],
  },
});
module.exports = client;

client.commands = new Discord.Collection();
client.db = new Enmap({
  name: "db",
  dataDir: "./database",
});

client.config = require("./config.json");
client.emotes = require("./emojis.json");

client.categories = require("fs").readdirSync("./commands/");

["commands", "events", "features"].forEach((file) => {
  require(`./handlers/${file}`)(client);
});

require("dotenv/config");
client.login(process.env.TOKEN);
