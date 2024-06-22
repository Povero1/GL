const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const rules = require('./rules.json');
const fs = require('fs');
const { startServer } = require("./alive.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.once("ready", () => {
  console.log(`Bot is Ready! ${client.user.tag}`);
  console.log(`Code by Wick Studio`);
  console.log(`discord.gg/wicks`);
});


client.on('messageCreate', async message => {
  if (message.content === '$معلومات') {
    if (message.member.permissions.has("ADMINISTRATOR")) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('قائمة المعلومات')
            .addOptions(rules.map(rule => ({
              label: rule.title,
              description: rule.id,
              value: rule.id,
            }))),
        );

      const embed = new MessageEmbed()
        .setColor('#EF172E')
        .setThumbnail('https://media.discordapp.net/attachments/1221421997767266395/1254005495736569886/InShot__.gif?ex=6677eb20&is=667699a0&hm=fd0bc99e60f1097030adb5c1521f94c84c63cf9a886b81c1951dff6645c7a7a9&=&width=600&height=602')
        .setTitle('معلومات السيرفر')
        .setDescription('**الرجاء اختيار احد المعلومات لقرائته من قائمة الاختيارات تحت**')
        .setImage('https://media.discordapp.net/attachments/1221421997767266395/1254004833564754041/cfea106e15d98d73.png?ex=6677ea82&is=66769902&hm=1670012f2997bc1ee2f682a1835fbcf2c1045b92d6a562664c9e0ffff571478c&=&format=webp&quality=lossless&width=687&height=386')
        .setFooter({ text: 'GOLD INFO Bot' })
        .setTimestamp();

      const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
      await message.delete();
    } else {
      await message.reply({ content: "You need to be an administrator to use this command.", ephemeral: true });
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    const rule = rules.find(r => r.id === interaction.values[0]);
    const text = fs.readFileSync(rule.description, 'utf-8');
    const ruleEmbed = new MessageEmbed()
      .setColor('#EF172E')
      .setTitle(rule.title)
      .setDescription(text)
.setImage('https://media.discordapp.net/attachments/1221421997767266395/1254004833564754041/cfea106e15d98d73.png?ex=6677ea82&is=66769902&hm=1670012f2997bc1ee2f682a1835fbcf2c1045b92d6a562664c9e0ffff571478c&=&format=webp&quality=lossless&width=687&height=386')
      .setFooter({ text: 'GOLD INFO BOT' })
      .setTimestamp();

    await interaction.reply({ embeds: [ruleEmbed], ephemeral: true });
  }
});

startServer();

client.login(process.env.TOKEN);
