const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                    .setURL(queue.currentTrack.url)
                    .addFields(
                        { name: ':hourglass: Duração:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                        { name: 'Música de:', value: `\`${queue.currentTrack.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                        { name: 'URL:', value: `\`${queue.currentTrack.url}\`` }
                    )
                    .setThumbnail(queue.currentTrack.thumbnail)
                    .setFooter({text:`do servidor ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.editReply({ content: `Enviei os dados da música por DM ✅`, ephemeral: true });
        }).catch(error => {
            return inter.editReply({ content: `Não consigo te enviar DM ...  ❌`, ephemeral: true });
        });
    },
};