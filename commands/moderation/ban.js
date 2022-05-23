const { Client, Message } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bans a member from the server.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No reason specified.";
    if (!member)
      return message.channel.send({
        content: `${client.emotes.no} You need to specify the member to ban.`,
      });
    if (member === message.member)
      return message.channel.send({
        content: `${client.emotes.no} You can't ban yourself.`,
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send({
        content: `${client.emotes.no} You can't ban ${member.user.tag}`,
      });
    if (!member.bannable)
      return message.channel.send({
        content: `${client.emotes.no} I can't ban ${member.user.tag}.`,
      });

    member.ban({ reason });
    message.channel.send({
      content: `Banned ${member.user.tag} from the server. Reason: ${reason}`,
    });
  },
};
