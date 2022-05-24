const { MessageEmbed } = require("discord.js");
const client = require("../index");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  try {
    if (
      command.userPerms &&
      !message.member.permissions.has(command.userPerms)
    ) {
      return message.channel.send({
        content: `${client.emotes.no} You do not have permission to use this command.`,
      });
    }

    await command.run(client, message, args);
  } catch (err) {
    console.log(err);
    message.channel.send({
      content: `${client.emotes.no} An error has occured!`,
      embeds: [
        new MessageEmbed()
          .setDescription(`\`\`\`${err}\`\`\``)
          .setColor(client.config.errColor),
      ],
    });
  }
});
