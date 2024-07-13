import BaseCommand from '../../frameWork/Command/base.js';

export default class Eval extends BaseCommand {
    constructor() {
        super('mode', {
            description: "turn on or off mode",
            category: 'dev',
            usage: `mode [on/off]`,
            dm: true,
            aliases: ['mode'],
        });
    }

    async run(M, { context }) {
        const bot = await this.client.DB.getBot('bot')
        let Bot
        if (!context) return M.reply('bot private / bot public\n\nUse like this')
        Bot = context.trim().split(' ')[0].trim()
        if (Bot === bot)
            return void M.reply(
                `🟡 Mode is already ${Bot}.`
            )
        await this.client.DB.updateBot('bot', Bot)
        return void M.reply(
            `🟢 Mode is now ${Bot}`
        )
    }
}