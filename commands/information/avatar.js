const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Sends the avatar of the mentioned user, or yourself.",
  aliases: ["av", "pfp", "profilepic", "profilepicture"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const avatar = member.user.displayAvatarURL({ dynamic: true, size: 4096 });
    const atta = new MessageAttachment(avatar, "avatar.png");
    console.log(atta);
    message.channel.send({
      content: `${member.user.tag}'s Avatar`,
      //   embeds: [
      //     new MessageEmbed().setImage(avatar).setColor(client.config.color),
      //   ],
      files: [atta],
    });
  },
};
