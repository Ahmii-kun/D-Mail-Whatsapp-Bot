import BaseCommand from '../../frameWork/Command/base.js';

export default class LYRICS extends BaseCommand {
    constructor() {
        super('lyrics', {
            description: 'Sends the lyrics of a given song',
            usage: 'lyrics [song]',
            cooldown: 10,
            exp: 20,
            category: 'media'
})
    }
    async run(M, { context }) {
        if (!context) return void (await M.reply('Provide the name of the song to search the lyrics'))
        const term = context.trim()
        const data = await this.client.utils.fetch(`https://weeb-api.vercel.app/genius?query=${term}`)
        if (!data.length) return void (await M.reply(`Couldn't find any lyrics | *"${term}"*`))
        const buffer = await this.client.utils.getBuffer(data[0].image)
        let text = `🔥 *Title:* ${data[0].title} *(${data[0].fullTitle})*\n🎤 *Artist:* ${data[0].artist}`
        const lyrics = await this.client.utils.fetch(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`)
        text += `\n\n${lyrics}`
        return void (await M.reply(buffer, 'image', undefined, undefined, text, undefined, {
            title: data[0].title,
            body: data[0].fullTitle,
            thumbnail: buffer,
            sourceUrl: data[0].url,
            mediaType: 1,
            mediaUrl: data[0].url
        }))
    }
}
