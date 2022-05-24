module.exports = (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.emoji.name === "🍪" && !user.bot) {
      const role = reaction.message.guild.roles.cache.find(
        (r) => r.name.toLowerCase().indexOf("cookie") !== -1
      );
      const member = reaction.message.guild.members.cache.get(user.id);
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
      }
      member.roles.add(role);
    }
  });
  client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.emoji.name === "🍪" && !user.bot) {
      const role = reaction.message.guild.roles.cache.find(
        (r) => r.name.toLowerCase().indexOf("cookie") !== -1
      );
      const member = reaction.message.guild.members.cache.get(user.id);
      if (reaction.message.partial) {
        await reaction.fetch();
        await reaction.message.fetch();
      }
      member.roles.remove(role);
    }
  });
};
