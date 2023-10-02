const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando...  ❌`, ephemeral: true });

    const track = queue.currentTrack;

    const methods = ['disabled', 'track', 'queue'];

    const timestamp = track.duration;
    
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    const progress = queue.node.createProgressBar();
    

    const embed = new EmbedBuilder()
    .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
    .setThumbnail(track.thumbnail)
    .setDescription(`Volume **${queue.node.volume}**%\nDuração **${trackDuration}**\nProgresso ${progress}\nModo de Loop **${methods[queue.repeatMode]}**\nSolicitado por ${track.requestedBy}`)
    .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true })})
    .setColor('ff0000')
    .setTimestamp()

    inter.editReply({ embeds: [embed], ephemeral: true });
}
