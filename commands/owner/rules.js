const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rules",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { channel } = message;
    const embeds = [
      new MessageEmbed()
        .setImage(
          "https://media.discordapp.net/attachments/977045748208271361/977058869836673034/Rules.png"
        )
        .setColor("#FFDEA7"),
      new MessageEmbed()
        .setColor("#FFDEA7")
        .setDescription(
          "All rules in the server apply at all times **and in all places** (unless stated otherwise). If you break a rule you will usually receive a warning, and 5 of these within a month will result in a ban from the server."
        )
        .addField(
          "\u200B",
          `\`\`\`📝 extra notes\`\`\`
        ➣ All Discord TOS and Guidelines apply.
        🔗 https://discordapp.com/terms
        🔗 https://discordapp.com/guidelines
        ➣ This is an English only server
        ➣ Not every rule is listed here, check channel topics to see if they have additional rules, or just use your common sense.`
        )
        .addField(
          "\u200B",
          `\`\`\`📜 rules\`\`\`
        **1.** Do not swear in the server, or attempt to bypass our filter by changing the characters of a banned word.
        
        **2.** Advertising isn't allowed anywhere except within the designated advertising channels such as <#977059430757695538>. DM advertising is also not allowed for anyone in the server, this includes saying "DM me for free nitro" or other items in chat.
        
        **3.** Do not post malicious links or files in the server that can steal information, such as links that grab IP addresses.
        
        **4.** Please keep your topics in the correct channel.
        
        **5.** Do not harass other users or be toxic, such as by arguing or insulting others.
        
        **6.** Don't cause spam by posting repeated text or large blocks of text.`
        )
        .addField(
          "\u200B",
          `
          **7.** Please make sure all topics are appropriate for children. This means the following content is not allowed:
        - NSFW
        - Related to substance abuse
        - Disturbing
        - Displays a grave nature
        
        **8.** Don't constantly beg for nitro, roles, items in games or anything similar.

          **9.** Do not use alts maliciously, such as:
        - Joining giveaways to give yourself an unfair advantage
        - Trying to bypass a punishment given to your main account
        
        **10.** Only play songs in the music voice channels, you aren't allowed to play normal videos. Songs with swearing are only allowed if it's not excessive.
        
        **11.** Impersonation of people/bots with profile pictures/names isn't allowed.`
        )
        .addField(
          "\u200B",
          `
          **12.** You cannot have symbols in your name (including invisible names).
          - Characters and symbols must be typeable on a standard English QWERTY keyboard
          
          **13.** Don't ask for personal information or distribute any personal information without consent.

          **14.** You aren't allowed to misuse spoilers by giving your text the appearance of swearing or something inappropriate. Using spoilers around a word that looks like a racial slur will result in an instant ban.
          
          **15.** You cannot annoy others in VCs by mic spamming or using voice changers.`.substr(
            0,
            1024
          )
        )
        .addField(
          "\u200B",
          `
          **16.** You aren't allowed to minimod in the server, this means acting as a moderator by threatening people with punishment. If you have a problem please ping an active staff member.

          **17.** Don't interfere with moderator's duties, such as:
        - Arguing with them while they actively moderate
        - Providing fake or forged evidence
        - Misinforming users with serious questions on purpose`
        )
        .addField(
          "\u200B",
          `\`\`\`😊 something special\`\`\`
        If you've read all the rules, react with the 🍪 below to become a Virtual Cookie Consumer!`
        ),
    ];
    message.delete();

    if (args[0]) {
      return channel.messages.fetch(args[0]).then((msg) => {
        msg.edit({
          embeds,
        });
        if (!msg.reactions.cache.has("🍪")) msg.react("🍪");
      });
    }

    const msg = await message.channel.send({
      embeds,
    });
    msg.react("🍪");
  },
};
