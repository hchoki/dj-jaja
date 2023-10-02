const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "remove a song from the queue",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the name/url of the track you want to remove',
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

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        if (!track && !number) inter.editReply({ content: `Você deve escolher uma das opções ${inter.member}...  ❌`, ephemeral: true });

        const BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')


        if (track) {
            const track_to_remove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!track_to_remove) return inter.editReply({ content: `Não foi possivel encontrar ${track} ${inter.member}... tente usar a url ou nome completo ❌`, ephemeral: true });
            queue.removeTrack(track_to_remove);
            BaseEmbed.setAuthor({name: `${track_to_remove.title} removida da lista ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks.toArray()[index].title

            if (!trackname) return inter.editReply({ content: `Essa música não existe ${inter.member}...  ❌`, ephemeral: true });   

            queue.removeTrack(index);

            BaseEmbed.setAuthor({name: `${track_to_remove.title} removida da lista ✅` })

            return inter.editReply({ embeds: [BaseEmbed] });
        }


         
    }
}
