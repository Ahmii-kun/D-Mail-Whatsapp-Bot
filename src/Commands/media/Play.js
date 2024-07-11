import BaseCommand from '../../frameWork/Command/base.js';
import YT  from '../../lib/YT'

export default class Play extends BaseCommand {
    constructor() {
        super('play', {
            description: 'Plays a song of the given term from YouTube',
            cooldown: 15,
            exp: 35,
            category: 'media',
            usage: 'play [term]',
            device: true
        });
    }

    async run(M, { context }) {
        const { device } = await this.client.DB.getUser(M.sender.jid);
        if (!context) return void M.reply('Provide a term to play, Baka!');
        const term = context.trim();
        const videos = await this.client.utils.fetch(`https://weeb-api.vercel.app/ytsearch?query=${term}`);
        if (!videos || !videos.length) return void M.reply(`No matching songs found | *"${term}"*`);
        const buffer = await new YT(videos[0].url, 'audio').download();
        if (device == 'ios') {
            return void (await M.reply(
                buffer,
                'document',
                undefined,
                'audio/mpeg',
                undefined,
                undefined,
                undefined,
                undefined,
                `Downloaded by ${this.client.config.session}`
            ));
        } else {
            return void (await M.reply(buffer, 'audio', undefined, 'audio/mpeg', undefined, undefined, {
                title: videos[0].title,
                thumbnail: await this.client.utils.getBuffer(videos[0].thumbnail),
                mediaType: 2,
                body: videos[0].description,
                mediaUrl: videos[0].url
            }));
        }
    }
}


