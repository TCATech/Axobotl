const { Client, Message } = require("discord.js");

module.exports = {
  name: "nick",
  description: "Changes the nickname of a member, or yourself.",
  userPerms: ["MANAGE_MEMBERS", "MANAGE_NICKNAMES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.member;

    if (
      user !== message.member &&
      user.roles.highest.position >= message.member.roles.highest.position
    )
      return message.channel.send(
        `${client.emotes.no} You can't change the nickname of ${user.user.tag}.`
      );

    if (!user.manageable)
      return message.channel.send(
        `${client.emotes.no} I can't change the nickname of ${user.user.tag}.`
      );

    const nickname =
      user === message.member ? args.join(" ") : args.slice(1).join(" ");

    if (!nickname) {
      await user.setNickname(null);
      return message.channel.send({
        content: `${client.emotes.yes} Removed nickname from ${user.user.tag}.`,
      });
    } else {
      await user.setNickname(nickname);
      return message.channel.send({
        content: `${client.emotes.yes} Set nickname to ${nickname} for ${user.user.tag}.`,
      });
    }
  },
};
