const { Client, Message } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmutes a member from the server, preventing them from typing.",
  userPerms: ["MODERATE_MEMBERS"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send({
        content: `${client.emotes.no} You need to specify the member to unmute.`,
      });
    if (user === message.member)
      return message.channel.send({
        content: `${client.emotes.no} You can't unmute yourself.`,
      });
    if (user.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send({
        content: `${client.emotes.no} You can't unmute ${user.user.tag}`,
      });
    if (!user.moderatable)
      return message.channel.send({
        content: `${client.emotes.no} I can't unmute ${user.user.tag}.`,
      });

    const reason = args.slice(1).join(" ") || "No reason specified.";

    user.timeout(null, reason);
    message.channel.send({
      content: `Unmuted ${user.user.tag}. Reason: ${reason}`,
    });
  },
};
