const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');
module.exports = {
    name: 'back',
    description: "Go back the song before",
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.node.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        if (!queue.history.previousTrack) return inter.editReply({ content: `Não teve músicas antes de ${inter.member}...  ❌`, ephemeral: true });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
        .setAuthor({name: `Tocando a música anterior ✅`})
        .setColor('#2f3136')

        inter.editReply({ embeds: [BackEmbed] });
    },
};