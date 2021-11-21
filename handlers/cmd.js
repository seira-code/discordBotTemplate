const { Client } = require("discord.js");
const fs = require('fs')
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

/**
 * @param {Client} client
*/
module.exports.init = async (client) => {
    console.log("[HANDLER] Cmd handler started!")
    fs.readdirSync('./commands').forEach(dir => {
        fs.readdirSync(`./commands/${dir}`).forEach(file => {
            const cmd = require(`../commands/${dir}/${file}`)
            client.commandsArray.push(cmd.slash.toJSON())
            client.commands.set(cmd.name, cmd)
        })
    })

    const rest = new REST({
        version: "9",
    }).setToken(process.env.DISCORD_TOKEN)
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { // Loading commands into the bot
            body: client.commandsArray,
        })
        console.log('All commands are loaded!')
    } catch (error) {
        console.error(error)
    }
}