const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue} = require('discord-player');

module.exports = {
    name: 'clear',
    description: 'clear all the music in the queue',
    voiceChannel: true,

    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: `Não tem mais músicas além da atual ${inter.member}... ❌`, ephemeral: true });

        await queue.tracks.clear();

        const ClearEmbed = new EmbedBuilder()
        .setAuthor({name: `Playlist limpa 🗑️`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [ClearEmbed] });

    },
};