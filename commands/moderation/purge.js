const { Client, Message } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Deletes a specific amount of messages.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const amount = args[0];

    if (!amount)
      return message.channel.send({
        content: `${client.emotes.no} You need to specify the amount of messages to delete.`,
      });

    if (isNaN(amount))
      return message.channel.send({
        content: `${client.emotes.no} You need to specify a number.`,
      });

    if (amount > 100)
      return message.channel.send({
        content: `${client.emotes.no} You can't delete more than 100 messages at once.`,
      });

    await message.channel.bulkDelete(Number(args[0]) + 1, true);
  },
};
