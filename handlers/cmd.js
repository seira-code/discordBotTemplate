const fs = require('fs')

/**
 * @param {Client} client
*/
module.exports.init = async (client) => {
    console.log("[HANDLER] Cmd handler started!")
    fs.readdirSync('./commands').forEach(dir => {
        fs.readdirSync(`./commands/${dir}`).forEach(file => {
            const cmd = require(`../commands/${dir}/${file}`)
            client.commandsArray.push(cmd.slash.toJSON())
            client.commands.set(cmd.slash.toJSON().name, cmd)
        })
    })

    client.application.commands.set(client.commandsArray)
}