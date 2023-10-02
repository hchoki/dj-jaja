const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'play the track',
    voiceChannel: true,

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        

        if(queue.node.isPlaying()) return inter.editReply({content: `A música já esta tocando, ${inter.member}...  ❌`, ephemeral: true})

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Voltando a tocar ${queue.currentTrack.title} ✅` : `Algo deu errado ${inter.member}...  ❌` })
        .setColor('#2f3136')
        
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
