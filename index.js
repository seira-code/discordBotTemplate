const { Client, Collection } = require("discord.js")
const client = new Client({
    intents: 4095 // Get intents bitfield here: https://ziad87.net/intents/
})

require('dotenv').config()
require('./utils/db').init()
require('./handlers/events.js').init(client)

client.commandsArray = []
client.commands = new Collection()

global.Config = require('./jsons/config.json')
global.Guild = require('./models/Guild')
global.User = require('./models/User')

client.login() // Login with DISCORD_TOKEN on .env

module.exports = client;