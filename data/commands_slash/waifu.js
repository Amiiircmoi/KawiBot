const { SlashCommandBuilder } = require('@discordjs/builders');
const { Reddit } = require('reddit');
const { RedditUsername, RedditPassword, RedditId, RedditSecret } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifupic')
        .setDescription('Affiche une image de ta waifu !')
        .addStringOption(option =>
            option
                .setName('waifu')
                .setDescription('Lorem Ipsum')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(`ui`);
    },
};

const reddit = new Reddit({
    username: RedditUsername,
    password: RedditPassword,
    appId: RedditId,
    appSecret: RedditSecret
})