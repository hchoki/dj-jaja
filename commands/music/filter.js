const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'add a filter to your track',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'filter you want to add',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter }) {
const queue = useQueue(inter.guild);
        const player = useMainPlayer()

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando... ? ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.filters.ffmpeg.getFiltersEnabled().map(x => filters.push(x));
        queue.filters.ffmpeg.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase().toString());

        if (!filter) return inter.editReply({ content: `Este filtro não existe ${inter.member}...  ❌\n${actualFilter ? `Filtro Ativo:  ${actualFilter}.\n` : ''}Lista de filtros disponíveis ${filters.map(x => `${x}`).join(', ')}.`, ephemeral: true });

        await queue.filters.ffmpeg.toggle(filter)

        const FilterEmbed = new EmbedBuilder()
        .setAuthor({name: `O filtro ${filter} esta ${queue.filters.ffmpeg.isEnabled(filter) ? 'ligado' : 'desligado'} ✅`})
        .setColor('#2f3136')

       return inter.editReply({ embeds: [FilterEmbed] });
    },
};