import BaseCommand from '../../frameWork/Command/base.js';
import { Sticker } from 'wa-sticker-formatter'

export default class stcikerCommand extends BaseCommand {
    constructor() {
        super('sticker', {
            description: "makes sticker of a img",
            category: 'core',
            usage: `s`,
            aliases: ['s'],
            exp: 20,
        });
    }

    async run(M, { context, flags }) {
        if (!M.hasSupportedMediaMessage && !M.quoted?.hasSupportedMediaMessage)
            return void M.reply('Provide an image/gif/video by captioning it or quoting it!')
        
        let buffer = M.hasSupportedMediaMessage ? await M.downloadMediaMessage(M.message.message) :
                     M.quoted && M.quoted.hasSupportedMediaMessage ? await M.downloadMediaMessage(M.quoted.message) : undefined
        
        flags.forEach(flag => context = context.replace(flag, ''))
        const numbersFlag = this.client.utils.extractNumbers(flags.join(' ').replace(/\--/g, ''))
        const quality = numbersFlag[0] || 50
        const pack = context.split('|')
        const sticker = new Sticker(buffer, {
            categories: `D-Mail`,
            pack: pack[1]?.trim() || `${this.client.config.stickerPack}`,
            author: pack[2]?.trim() || `${this.client.config.stickerAuthor}`,
            quality,
            type: flags.includes('--c') || flags.includes('--crop') || flags.includes('--cropped') ? 'crop' :
                  flags.includes('--s') || flags.includes('--stretch') || flags.includes('--stretched') ? 'default' :
                  flags.includes('--circle') || flags.includes('--r') || flags.includes('--round') || flags.includes('--rounded') ? 'circle' :
                  'full'
        })
        
        return void (await M.reply(await sticker.build(), 'sticker'))        
    } 
        }