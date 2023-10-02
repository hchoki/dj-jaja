const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'skip the track',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

         if (!queue || !queue.isPlaying()) return inter.editReply({ content:`Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: success ? `Música atual ${queue.currentTrack.title} avançada ✅` : `Algo deu errado ${inter.member}... ❌` })


       return inter.editReply({ embeds: [SkipEmbed] });

    },
};