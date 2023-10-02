const { QueueRepeatMode, useMainPlayer, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'enable or disable looping of song\'s or the whole queue',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
            { name: 'autoplay', value: 'enable_autoplay' },
        ],
    }
    ],
    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);
        let BaseEmbed = new EmbedBuilder()
        .setColor('#2f3136')

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content:`Você primeiro precisa desabilitar o loop da música atual (/loop Disable) ${inter.member}❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                
                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}❌` : `Modo de repetição foi ativo, a fila será repetida até O SOL EXPLODIR 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content:`Você primeiro precisa ativar o loop (/loop Queue ou /loop Song) ${inter.member}❌`, ephemeral: true });
                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}...  ❌` : `Modo de repetição foi desativado. 🔁`})

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content:`Você primeiro precisa desabilitar o loop da música atual (/loop Disable) ${inter.member}❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}...  ❌` : `Modo de repetição foi ativo, a música atual vai repetir até O SOL EXPLODIR (você pode parar o loop usando /loop disable)` })

                return inter.editReply({ embeds: [BaseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content:`Você primeiro precisa desabilitar o loop da música atual (/loop Disable) ${inter.member}❌`, ephemeral: true });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

                BaseEmbed.setAuthor({ name: success ? `Algo deu errado ${inter.member}...  ❌` : `Autoplay foi habilitado, vamos adicionar músicas parecidas com a atual na lista 🔁` })

                return inter.editReply({ embeds: [BaseEmbed] });

            }
        }
       
    },
};