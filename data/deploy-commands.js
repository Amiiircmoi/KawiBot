const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

function reloadCommands() {
    const commands = [];
    const commandFiles = fs.readdirSync('./data/commands_slash').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands_slash/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Les commandes de Kawi ont bien été rafraichi.'))
        .catch(console.error);
}

module.exports = { reloadCommands };