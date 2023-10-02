module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando...  ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    return inter.editReply({ content: success ? `Música atual ${queue.currentTrack.title} avançada ✅` : `Algo deu errado ${inter.member}... ❌`, ephemeral: true});
}