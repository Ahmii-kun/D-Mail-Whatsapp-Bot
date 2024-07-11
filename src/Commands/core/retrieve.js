import BaseCommand from '../../frameWork/Command/base.js';

export default class retrieveCommand extends BaseCommand {
    constructor() {
        super('retrieve', {
            description: "Retreive a viewonce message",
            category: 'core',
            usage: `rt`,
            aliases: ['rt'],
            exp: 20,
        });
    }

    async run(M) {
        if (!M.quoted || M.quoted.type !== 'viewOnceMessageV2')
        return void M.reply('Quote a view once message to retrieve, Baka!')
        const buffer = await M.downloadMediaMessage(M.quoted.message.viewOnceMessageV2.message)
        await M.reply(buffer, 'image', undefined, undefined, 'Retrieved the message')
    }
}