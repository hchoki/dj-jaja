const { EmbedBuilder } = require('discord.js');

module.exports = (queue, error) => {
    
    const ErrorEmbed = new EmbedBuilder()
    .setAuthor({name: `Me caguei com um erro aqui, POR FAVOR, ME AJUDAAAA`, iconURL: track.thumbnail})
    .setColor('#EE4B2B')

queue.metadata.send({ embeds: [ErrorEmbed] })

console.log(`Error emitted from the PLayer ${error.message}`);
}
