const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const reddit = require('reddit.images');
const Threads = require('../rthread.json');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('waifupic')
        .setDescription('Affiche une image de ta waifu !')
        .addStringOption(option =>
            option
                .setName('waifu')
                .setDescription('Nom de ta waifu')
                .setRequired(true)),

    async execute(interaction) {

        const waifu = interaction.options.getString('waifu').toLowerCase();

        let selectedthread = null
        for (const thread in Threads) {
            if (Threads[thread].includes(waifu)) {
                selectedthread = thread;
            }
        }

        if (selectedthread) {

            reddit.FetchSubredditPost({
                subreddit: selectedthread
            }).then((data) => {

                let embed = new MessageEmbed()
                    .setAuthor({ name: data.title, url: data.postLink })
                    .setImage(data.image);
                interaction.reply({ embeds: [embed] });

            });

        } else {
            await interaction.reply({ content: `" ${waifu} " n'est pas référencé dans la liste des alias, peut être faut-il l'ajouter ?`, ephemeral: true })
        }

    },
};