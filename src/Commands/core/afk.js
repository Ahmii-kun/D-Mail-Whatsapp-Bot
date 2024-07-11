import BaseCommand from '../../frameWork/Command/base.js';

export default class AfkCommand extends BaseCommand {
    constructor() {
        super('afk', {
            description: "put afk",
            category: 'core',
            usage: `afk [reason]`,
            aliases: ['afk'],
        });
    }

    async run(M, { context }) {
        const reason = context.trim()
        if (!reason) return M.reply('Please provide a reason for being AFK.');
        const { afk } = await this.client.DB.fetchUser(M.sender.jid);
        let Afk;
        if (!afk?.custom) {
            Afk = { custom: true, reason: reason, time: new Date() };
            await this.client.DB.updateUser(M.sender.jid, 'afk', 'set', Afk);
            M.reply('You are now AFK.');
        }
    }
}