const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'pause the track',
    voiceChannel: true,

    execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        
        if(queue.node.isPaused()) return inter.editReply({content: `A música atual já esta em pausa, ${inter.member}...  ❌`, ephemeral: true})

        const success = queue.node.setPaused(true);
        
        const PauseEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Música atual ${queue.currentTrack.title} pausada ✅` : `Algo deu errado ${inter.member}...  ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [PauseEmbed] });
    },
};
// embed update stoped here