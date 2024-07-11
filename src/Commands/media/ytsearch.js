import BaseCommand from '../../frameWork/Command/base.js';

export default class YTSEARCH extends BaseCommand {
    constructor() {
        super('yts', {
            description: 'Searches the video of the given query in YouTube',
            category: 'media',
            usage: 'yts [query]',
            aliases: ['ytsearch']
        });
    }
    async run(M, { context }) {
        if (!context) return void M.reply('Provide a query, Baka!')
        const query = context.trim()
        const videos = await this.client.utils.fetch(`https://weeb-api.vercel.app/ytsearch?query=${query}`)
        if (!videos || !videos.length) return void M.reply(`No videos found | *"${query}"*`)
        let text = ''
        const length = videos.length >= 10 ? 10 : videos.length
        for (let i = 0; i < length; i++)
            text += `*Video #${i + 1}*\n
🎬 *Title:* ${videos[i].title}\n
🎤 *Channel:* ${videos[i].author.name}\n
⏱️ *Duration:* ${this.client.utils.formatSeconds(videos[i].seconds)}\n
🔗 *URL:* ${videos[i].url}\n\n`;
        return void (await M.reply(text, 'text', undefined, undefined, undefined, undefined, {
            title: videos[0].title,
            thumbnail: await this.client.utils.getBuffer(videos[0].thumbnail),
            mediaType: 2,
            body: videos[0].description,
            mediaUrl: videos[0].url
        }))
    }
}
