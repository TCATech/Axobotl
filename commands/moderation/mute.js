const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const acceptableTimes = [
  ms("1m"),
  ms("5m"),
  ms("10m"),
  ms("1h"),
  ms("1d"),
  ms("7d"),
];

module.exports = {
  name: "mute",
  description: "Mutes a member from the server, preventing them from typing.",
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
        content: `${client.emotes.no} You need to specify the member to mute.`,
      });
    if (user === message.member)
      return message.channel.send({
        content: `${client.emotes.no} You can't mute yourself.`,
      });
    if (user.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send({
        content: `${client.emotes.no} You can't mute ${user.user.tag}`,
      });
    if (!user.moderatable)
      return message.channel.send({
        content: `${client.emotes.no} I can't mute ${user.user.tag}.`,
      });

    if (!args[1])
      return message.channel.send({
        content: `${client.emotes.no} You need to specify a time.`,
      });

    const time = ms(args[1]);
    if (!acceptableTimes.includes(time))
      return message.channel.send({
        content: `${client.emotes.no} You need to specify a valid time.`,
        embeds: [
          new MessageEmbed()
            .addField(
              "Valid times",
              acceptableTimes
                .map((t) => `\`${ms(t, { long: true })}\``)
                .join(", ")
            )
            .setColor(client.config.errColor),
        ],
      });

    const reason = args.slice(2).join(" ") || "No reason specified.";

    user.timeout(time, reason);
    message.channel.send({
      content: `Muted ${user.user.tag} for ${ms(time, {
        long: true,
      })}. Reason: ${reason}`,
    });
  },
};
