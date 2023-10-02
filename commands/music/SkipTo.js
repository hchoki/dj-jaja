const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "skips to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to skip to',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'the place in the queue the song is in',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const player = useMainPlayer()

        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number')

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Você deve escolher uma das opções de música ${inter.member}...  ❌`, ephemeral: true });

            if (track) {
                const track_skipto = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_skipto) return inter.editReply({ content: `não encontrei ${track} ${inter.member}... tente usar a url ou nome completo ? ❌`, ephemeral: true });
                queue.node.skipTo(track_skipto);
                return inter.editReply({ content: `Pulando para ${track_skipto.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) return inter.editReply({ content: `Essa música não existe ${inter.member}...  ❌`, ephemeral: true });   
        queue.node.skipTo(index);

        const skipToEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulando para ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [skipToEmbed] });
    }
         
    }
}
