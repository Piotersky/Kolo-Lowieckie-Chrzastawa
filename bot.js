const { Client, Collection, GatewayIntentBits, ActivityType } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const log = require("./src/utils/log")

let token = config.token

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`Bot jest aktywny!`);
    require("./strona/server.js")(client);
})

//event-handler
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
//

client.login(token)