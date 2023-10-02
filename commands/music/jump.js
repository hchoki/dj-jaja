const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'jump',
    description: "Jumps to particular track in queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to jump to',
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
        if (!track && !number) inter.editReply({ content: `Você deve escolher alguma música para pular ${inter.member}...  ❌`, ephemeral: true });

            if (track) {
                const track_to_jump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
                if (!track_to_jump) return inter.editReply({ content: `Não foi possivel encontrar essa música ${track} ${inter.member}... Tente usar a url ou nome completo da música ? ❌`, ephemeral: true });
                queue.node.jump(track_to_jump);
                return inter.editReply({ content: `Pulando para ${track_to_jump.title}  ✅` });
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks.toArray()[index].title
        if (!trackname) return inter.editReply({ content: `Essa música não existe ${inter.member}...  ❌`, ephemeral: true });   
        queue.node.jump(index);

        const JumpEmbed = new EmbedBuilder()
        .setAuthor({name: `Pulando para ${trackname} ✅`})
        .setColor('#2f3136')
        
        inter.editReply({ embeds: [JumpEmbed] });
    }
         
    }
}
