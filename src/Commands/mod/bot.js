import BaseCommand from '../../frameWork/Command/base.js';

export default class Eval extends BaseCommand {
    constructor() {
        super('bot', {
            description: "turn on or off bot",
            category: 'dev',
            usage: `bot [on/off]`,
            dm: true,
            aliases: ['bot'],
        });
    }

    async run(M, { context }) {
        const { bot } = await this.client.DB.getGroup(M.from)
        const options = ['on', 'off']
        let Bot
        if (!context) return M.reply('bot on / bot off\n\nUse like this')
        Bot = context.trim().split(' ')[0].trim()
        if (Bot === bot)
            return void M.reply(
                `🟡 Bot is already ${Bot}.`
            )
        await this.client.DB.updateGroup(M.from, 'bot', Bot)
        return void M.reply(
            `🟢 Bot is now ${Bot}`
        )
    }
}