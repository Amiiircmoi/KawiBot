const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Retrouves des informations')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Informations sur un utilisateur')
                .addMentionableOption(option =>
                    option
                        .setName('membre')
                        .setDescription('@ du membre')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Informations sur le serveur')),
    async execute(interaction) {
            await interaction.reply('Pas encore disponible !');
        },
};