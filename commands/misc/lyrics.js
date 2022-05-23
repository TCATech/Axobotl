const { Client, Message, MessageEmbed } = require("discord.js");
const findLyrics = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  description: "Finds the lyrics of a specific song.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let artist = "";
    let title = "";
    let pages = [];
    let current = 0;

    const filter = (msg) => msg.author.id == message.author.id;
    let options = {
      filter,
      max: 1,
    };

    const msg = await message.channel.send({
      content:
        'Question 1/2: What is the artist\'s name?\n\nType "cancel" to cancel.',
    });
    let col = await message.channel.awaitMessages(options);
    if (col.first().content === "cancel")
      return message.channel.send("Cancelled.");
    artist = col.first().content;
    col.first().delete();

    await msg.edit({
      content:
        'Question 2/2: What is the song\'s name?\n\nType "cancel" to cancel.',
    });

    let col2 = await message.channel.awaitMessages(options);
    if (col2.first().content === "cancel")
      return message.channel.send("Cancelled.");
    title = col2.first().content;
    col2.first().delete();

    const res = await findLyrics(artist, title);
    if (!res) return message.channel.send("No lyrics found.");

    for (let i = 0; i < res.length; i += 2048) {
      let lyrics = res.substring(i, Math.min(res.length, i + 2048));
      let page = new MessageEmbed()
        .setColor(client.config.color)
        .setDescription(lyrics);
      pages.push(page);
    }

    const emojis = ["⏪", "🏠", "⏩"];

    const filter2 = (reaction, user) =>
      emojis.includes(reaction.emoji.name) && message.author.id === user.id;
    msg.edit({
      content: `Page ${current + 1}/${pages.length}`,
      embeds: [pages[current]],
    });
    if (pages.length > 1) {
      for (const emoji of emojis) {
        await msg.react(emoji);
      }
    }

    let ReactionCol = msg.createReactionCollector({
      filter: filter2,
    });

    ReactionCol.on("collect", (reaction, user) => {
      reaction.users.remove(reaction.users.cache.get(message.author.id));

      if (reaction.emoji.name === emojis[0] && current !== 0) {
        current -= 1;
        msg.edit({
          content: `Page ${current + 1}/${pages.length}`,
          embeds: [pages[current]],
        });
      } else if (reaction.emoji.name === emojis[1]) {
        current = 0;
        msg.edit({
          content: `Page ${current + 1}/${pages.length}`,
          embeds: [pages[current]],
        });
      } else if (
        reaction.emoji.name === emojis[2] &&
        current < pages.length - 1
      ) {
        current += 1;
        msg.edit({
          content: `Page ${current + 1}/${pages.length}`,
          embeds: [pages[current]],
        });
      }
    });
  },
};
