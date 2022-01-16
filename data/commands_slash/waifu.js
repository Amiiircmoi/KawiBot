const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifupic')
        .setDescription('Affiche une image de ta waifu !')
        .addStringOption( option =>
            option.setName('waifu')
                .setDescription('Lorem Ipsum')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(`ui`);
    },
};