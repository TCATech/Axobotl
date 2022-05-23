const { Client, Message } = require("discord.js");

module.exports = {
  name: "unlock",
  description:
    "Unlocks the current or the mentioned channel, making it so members can't talk in it.",
  userPerms: ["MANAGE_CHANNELS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.channel;

    if (channel.type === "GUILD_TEXT") {
      channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: null,
        ADD_REACTIONS: null,
        ATTACH_FILES: null,
        USE_APPLICATION_COMMANDS: null,
        SEND_MESSAGES_IN_THREADS: null,
        CREATE_PUBLIC_THREADS: null,
        CREATE_PRIVATE_THREADS: null,
      });
    } else if (channel.type === "GUILD_VOICE") {
      channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: null,
      });
    }

    message.channel.send({
      content: `Unlocked <#${channel.id}>.`,
    });
  },
};
