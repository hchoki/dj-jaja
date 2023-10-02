const { EmbedBuilder } = require('discord.js');

module.exports = (queue) => {

 const Disconnect = new EmbedBuilder()
    .setAuthor({name: `Disconectado do canal de voz, limpando a fila ❌`})
    .setColor('#2f3136')

queue.metadata.send({ embeds: [Disconnect] })
}
