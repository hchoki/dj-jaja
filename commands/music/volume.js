const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'adjust',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'the amount volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.node.volume === vol) return inter.editReply({ content: `O volume que você definiu já é o volume atual ${inter.member}...  ❌`, ephemeral: true });

        const success = queue.node.setVolume(vol);

       return inter.editReply({ content: success ? `O volume foi modificado para ${vol}/${maxVol}% 🔊` : `Algo deu errado ${inter.member}...  ❌` });
    },
};