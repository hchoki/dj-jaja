const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'queue',
    description: 'Get the songs in the queue',
    voiceChannel: true,

    execute({ client, inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[0]) return  inter.editReply({ content: `Não tem mais músicas na fila além da atual ${inter.member}...  ❌`, ephemeral: true });

        const methods = ['', '🔁', '🔂'];

        const songs = queue.tracks.size;

        const nextSongs = songs > 5 ? `E **${songs - 5}** outras música(s)...` : `Mais **${songs}** música(s)...`;

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (solicitado por : ${track.requestedBy.username})`)

        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({name: `Fila - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setDescription(`Música Atual - ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.editReply({ embeds: [embed] });
    },
};