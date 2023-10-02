module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando...  ❌`, ephemeral: true });

    const resumed = queue.node.resume();
    let message = `Música atual ${queue.currentTrack.title} resumida ✅`;
    
    if (!resumed) {
        queue.node.pause();
        message = `Música atual ${queue.currentTrack.title} pausada ✅`;
    }

    return inter.editReply({
        content: message, ephemeral: true
    });
}