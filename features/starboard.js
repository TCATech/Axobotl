const Discord = require("discord.js");

/**
 *
 * @param {Discord.Client} client
 */
module.exports = (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    const starboardHandler = async () => {
      const channel = client.channels.cache.find(
        (c) =>
          c.name.toLowerCase().indexOf("starboard") !== -1 &&
          c.type === "GUILD_TEXT"
      );

      const msgs = await channel.messages.fetch({ limit: 100 });
      const sentMessage = msgs.find((msg) =>
        msg.embeds.length === 1
          ? msg.embeds[0].footer.text.startsWith(
              "Message ID: " + reaction.message.id
            )
            ? true
            : false
          : false
      );
      if (sentMessage)
        sentMessage.edit({
          content: `⭐ ${reaction.count}`,
          embeds: sentMessage.embeds,
        });
      else {
        const embed = new Discord.MessageEmbed()
          .setAuthor({
            name: reaction.message.author.tag,
            iconURL: reaction.message.author.displayAvatarURL({
              dynamic: true,
            }),
          })
          .setDescription(
            `**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`
          )
          .setColor("YELLOW")
          .setFooter({ text: `Message ID: ${reaction.message.id}` })
          .setTimestamp();
        if (channel)
          channel.send({
            content: "⭐ 1",
            embeds: [embed],
          });
      }
    };

    if (reaction.emoji.name === "⭐") {
      if (reaction.message.channel.name.indexOf("starboard") !== -1)
        return reaction.users.remove(user);
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
        starboardHandler();
      } else starboardHandler();
    }
  });
};
