const { Client, Message } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a member from the server.",
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
        content: `${client.emotes.no} You need to specify the member to kick.`,
      });
    if (member === message.member)
      return message.channel.send({
        content: `${client.emotes.no} You can't kick yourself.`,
      });
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send({
        content: `${client.emotes.no} You can't kick ${member.user.tag}`,
      });
    if (!member.kickable)
      return message.channel.send({
        content: `${client.emotes.no} I can't kick ${member.user.tag}.`,
      });

    member.kick({ reason });
    message.channel.send({
      content: `Kicked ${member.user.tag} from the server. Reason: ${reason}`,
    });
  },
};
