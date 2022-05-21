const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infos')
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
        switch (interaction.options.getSubcommand()) {
            case 'server':
                let guild = interaction.guild;
                let embed = new MessageEmbed()
                    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
                    .setDescription('Membres : ' + guild.memberCount)
                    .setFooter({ text: guild.createdAt.toString() });
                await interaction.reply({ embeds: [embed] });
                break;
            case 'user':
                let member = interaction.options.getMentionable('membre');
                if (member) {
                    let embed = new MessageEmbed()
                        .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
                        .setTimestamp(member.user.createdAt);
                    await interaction.reply({ embeds: [embed] });
                }
                break;
            default:
                await interaction.reply('Cette sous commande n\'existe pas...')
                break;
        };
    },
};