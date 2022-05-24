const { Client, Message } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "slowmode",
  description: "Changes the slowmode of the current channel.",
  userPerms: ["MANAGE_CHANNELS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message;
    if (!args[0])
      return message.channel.send({
        content: `${client.emotes.no} You need to specify the amount of messages to delete.`,
      });
    if (ms(args[0]) > ms("6h"))
      return message.channel.send({
        content: `${client.emotes.no} You can't set slowmode to more than 6 hours.`,
      });

    channel.setRateLimitPerUser(ms(args[0]) / 1000);

    message.channel.send({
      content: `Set slowmode to ${ms(ms(args[0]), { long: true })}.`,
    });
  },
};
