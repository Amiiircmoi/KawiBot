const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoi le ping du bot'),
    async execute(interaction) {
        await interaction.reply(`🏓 Le délais de réponse du bot est de **${Date.now() - interaction.createdTimestamp}ms**. L'API a une latence de **${Math.round(interaction.client.ws.ping)}ms**`);
    },
};