module.exports.checkDB = async (id, guild) => {
    !(await User.findOne({ userId: id, guildId: guild })) ? User.create({ userId: id, guildId: guild }) : null
}