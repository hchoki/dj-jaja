const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'seek',
    description: 'skip back or foward in a song',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'time that you want to skip to',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const player = useMainPlayer()

const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Nenhuma música tocando ${inter.editReply}...  ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));

        if (timeToMS >= queue.currentTrack.durationMS) return inter.editReply({ content:`O tempo indicado é maior que a duração da música ${inter.member}...  ❌\n*tente um tempo válido, tipo **5s, 10s, 20 segundos, 1m**...*`, ephemeral: true });

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Definido o tempo de play **${ms(timeToMS, { long: true })}** ✅`})


        inter.editReply({ embeds: [SeekEmbed] });
    },
};