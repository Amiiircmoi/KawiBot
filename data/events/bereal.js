const { MessageEmbed } = require('discord.js');
const { beRealChannelId, beRealRoleId } = require('../config.json');
const devMode = false;

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        beReal(client); // Start BeReal
    },
};

// Main function
async function beReal(client) {
    var beRealChannel = client.channels.cache.get(beRealChannelId);

    var beRealTime = getTomorowRandomTime();
    console.log(`Ready! Next BeReal at ${beRealTime}`);

    while (true) {
        console.log('Waiting for BeReal...');

        if (new Date() > beRealTime || devMode) {

            beRealChannel.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Hop Hop Hop ! C'est l'heure de BeReal !`)
                    .setDescription(`Faites nous rêver ${beRealChannel.guild.roles.cache.get(beRealRoleId)} !`)
                    .setColor('#FFFFFF')
                    .setTimestamp(new Date().toISOString())
                    .setImage(`https://bere.al/images/logos/bereal-twitter.png`)
                ],
            });

            beRealChannel.guild.members.fetch().then(members => {
                members.forEach(member => {
                    if (!member.isBot && member.roles.cache.has(beRealRoleId)) {
                        let user = member.user;
                        user.createDM()
                            .then(dm => {

                                dm.send({
                                    embeds: [new MessageEmbed()
                                        .setTitle(`Hop Hop Hop ! C'est l'heure de BeReal !`)
                                        .setDescription(`Fais nous rêver même si t'es aux chiottes ! Tu as 10 minutes !`)
                                        .setColor('#FFFFFF')
                                        .setImage(`https://bere.al/images/logos/bereal-twitter.png`)
                                    ],
                                });

                                const filter = m => m.author.id === user.id && m.attachments.size > 0;
                                const collector = dm.createMessageCollector({ filter, time: 600_000, max: 1 });
                                collector.on('collect', m => {
                                    let embed = new MessageEmbed()
                                        .setTitle(`BeReal de ${user.username}`)
                                        .setDescription(`Voici le BeReal de ${user} !`)
                                        .setColor('#B2FCAD')
                                        .setImage(m.attachments.first().url);

                                    if (m.attachments.size > 1) {
                                        embed.setThumbnail(m.attachments.last().url);
                                    }
                                    beRealChannel.send({
                                        embeds: [embed],
                                    });
                                });
                                collector.on('end', collected => {
                                    if (collected.size == 0) {
                                        beRealChannel.send(`Ce nullos de ${user} n'a pas envoyé son BeReal ! Huez le bouuuuhhhh !`);
                                    }
                                });

                            });
                    }
                })
            });

            beRealTime = getTomorowRandomTime();
            console.log(`Next BeReal at ${beRealTime}`);
        }

        await sleep(60000);
    }
}

function getTomorowRandomTime() {
    var date = new Date();
    date.setDate(date.getDate() + 1);

    if (date.getDay() < 5) {
        date.setHours(getRandomArbitrary(9, 22));
    } else if (date.getDay() == 5) {
        date.setHours(getRandomArbitrary(9, 24));
    } else {
        date.setHours(getRandomArbitrary(12, 24));
    }
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    return date;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}