const { Message, Client, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "ping",
  description: "Tests the ping of the bot.",
  userPerms: ["ADMINISTRATOR"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let oldate = Math.floor(Date.now() / 10);
    await message.channel
      .send({
        content: `${client.emotes.loading} Pinging...`,
      })
      .then((res) => {
        const ping = res.createdTimestamp - message.createdTimestamp;

        let newtime = Math.floor(Math.floor(Date.now() / 10) - oldate);
        if (newtime < 0) newtime *= -1;
        res.edit({
          content: "Pong! 🏓",
          embeds: [
            new MessageEmbed()
              .addField("Bot Latency", `${ping}ms`, true)
              .addField("API Latency", `${client.ws.ping}ms`, true)
              .addField("Host Latency", `${Math.floor(newtime)}ms`, true)
              .addField("Uptime", ms(client.uptime, { long: true }), false)
              .setColor(client.config.color),
          ],
        });
      });
  },
};
