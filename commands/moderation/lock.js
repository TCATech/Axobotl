const { Client, Message } = require("discord.js");

module.exports = {
  name: "lock",
  description:
    "Locks the current or the mentioned channel, making it so members can't talk in it.",
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
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        ATTACH_FILES: false,
        USE_APPLICATION_COMMANDS: false,
        SEND_MESSAGES_IN_THREADS: false,
        CREATE_PUBLIC_THREADS: false,
        CREATE_PRIVATE_THREADS: false,
      });
    } else if (channel.type === "GUILD_VOICE") {
      channel.permissionOverwrites.edit(message.guild.id, {
        CONNECT: false,
      });
      if (channel.members.size > 0) {
        channel.members.forEach((member) => {
          member.voice.setChannel(null);
        });
      }
    }

    message.channel.send({
      content: `Locked <#${channel.id}>.`,
    });
  },
};
