const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./data/config.json');
const commands_slash = require('./data/deploy-commands');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./data/commands_slash').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./data/commands_slash/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    commands_slash.reloadCommands();

    // Défini l'activité de Kawi
    client.user.setActivity('/help | by Amiiir#9999', { type: 'LISTENING' });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Il y a eu une erreur lors de l\'excécution de la commande !', ephemeral: true });
    }
});

client.login(token);