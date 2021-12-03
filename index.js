const { Client, Collection } = require("discord.js")
require('dotenv').config()
const client = new Client({
    intents: 4095 // Get intents bitfield here: https://ziad87.net/intents/
})

client.login().then(()=>{ // Login with DISCORD_TOKEN on .env
	client.commandsArray = []
client.commands = new Collection()

global.Config = require('./jsons/config.json')
global.Guild = require('./models/Guild')
global.User = require('./models/User')

require('./utils/db').init()
require('./handlers/events.js').init(client)
require('./handlers/cmd.js').init(client)
}) 

module.exports = client;