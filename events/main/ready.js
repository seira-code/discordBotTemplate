module.exports = {
    name: 'ready',
    async execute(client) {

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