module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Não tem nenhuma música tocando...  ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `Não teve músicas antes de ${inter.member}...  ❌`, ephemeral: true });

    await queue.history.back();

    inter.editReply({ content:`**Voltando** para a música anterior ✅`, ephemeral: true});
}
