module.exports = {
    name: 'ready',
    async execute(client) {
        fs.readdir('./handlers', (err, files) => {
            if (err) return console.error(err)
            files.filter(v => v.endsWith(".js") && !v.startsWith('events')).forEach(f => {
                require(`../../handlers/${f}`).init(client)
            })
        })


        setInterval(() => {
            let players = 0
            client.guilds.cache.forEach((gld) => {
                players += gld.memberCount
            })

            client.user.setActivity(`U: ${players} | S: ${client.guilds.cache.size}`, { type: "WATCHING" })

        }, 1800000);

        console.log(`✨ ${client.user.tag} logged.`);
    }
}