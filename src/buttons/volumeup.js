const maxVol = client.config.opt.maxVol;
module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

    const vol = Math.floor(queue.node.volume + 5)

    if (vol > maxVol ) return inter.editReply({ content: `Não consigo aumentar o volume ${inter.member}...  ❌`, ephemeral: true })

    if (queue.node.volume === vol) return inter.editReply({ content: `O volume que você definiu já é o volume atual ${inter.member}...  ❌`, ephemeral: true });

    const success = queue.node.setVolume(vol);

    return inter.editReply({ content: success ? `O volume foi modificado para ${vol}/${maxVol}% 🔊` : `Algo deu errado ${inter.member}...  ❌`, ephemeral: true});
}