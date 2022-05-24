const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get a list of commands or info about a specific command.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args[0]) {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0])
        );
      if (!command || command.directory === "owner") {
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle(`${client.emotes.no} Command not found.`)
              .setColor(client.config.color),
          ],
        });
      }

      const embed = new MessageEmbed().setColor(client.config.color);

      if (command.name) {
        embed.setTitle(`Information about \`${command.name}\``);
        embed.addField(
          "Command",
          "```" + client.config.prefix + command.name + "```"
        );
      }

      if (command.description)
        embed.addField(
          "Description",
          "```" +
            command.description.replace("{botname}", client.user.username) +
            "```"
        );
      else embed.addField("Description", "```No description available.```");

      if (command.userPerms)
        embed.addField(
          "Permissions",
          "```" +
            command.userPerms
              .map(
                (value) =>
                  `${
                    value[0].toUpperCase() +
                    value
                      .toLowerCase()
                      .slice(1)
                      .replace(/_/gi, " ")
                      .replace("guild", "server")
                  }`
              )
              .join(", ") +
            "```"
        );

      if (command.aliases)
        embed.addField("Aliases", "```" + command.aliases.join(", ") + "```");

      if (command.usage) {
        embed.addField(
          "Usage",
          `\`\`\`${message.prefix}${command.name} ${command.usage}\`\`\``
        );
        embed.setFooter({
          text: "<> = required, [] = optional",
        });
      }

      message.channel.send({
        embeds: [embed],
      });
    } else {
      const embed = new MessageEmbed()
        .setColor(client.config.color)
        .setTitle("HELP MENU 🔰");
      const commands = (category) => {
        return client.commands
          .filter((cmd) => cmd.directory === category)
          .map((cmd) => `\`${cmd.name}\``);
      };
      for (let i = 0; i < client.categories.length; i += 1) {
        const current = client.categories[i];
        if (current === "owner") continue;
        const items = commands(current);
        embed.addField(
          `${current.toUpperCase()} [${items.length}]`,
          `> ${items.sort((a, b) => a.localeCompare(b)).join(", ")}`
        );
      }
      message.channel.send({
        content: `To see more information for a specific command, type: ${client.config.prefix}help [command]`,
        embeds: [embed],
      });
    }
  },
};
