const { Client, CommandInteraction } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    slash: new SlashCommandBuilder()
        .setName('kick')
        .setDescription("Кик пользователя")
        .addUserOption(option =>
            option.setName('пользователь')
                .setDescription('Пользователь для кика')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('причина')
                .setDescription('Причина кика')),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const member = interaction.options.getMember('пользователь')
        const reason = interaction.options.getString('причина') ?? "Без причины"
        if (!member.kickable) return interaction.default("Я не могу кикнуть данного пользователя", true)
        member.kick(`${interaction.user.username}: ${reason}`).then(async () => {
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor(client.user.username, client.user.avatarURL())
                        .setTitle('Система блокировок пользователей')
                        .setDescription(`Администратор ${interaction.member} кикнул пользователя \`${member.user.tag}\` с причиной __${reason}__`)
                        .setFooter(`Запросил: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                        .setColor(Config.colors.success)
                        .setTimestamp()
                ]
            })
        })
    }
}