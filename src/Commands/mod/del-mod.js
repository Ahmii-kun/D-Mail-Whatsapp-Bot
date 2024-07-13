import BaseCommand from '../../frameWork/Command/base.js';

export default class DelCommand extends BaseCommand {
    constructor() {
        super('del-mod', {
            description: "del-mod",
            category: 'dev',
            usage: `del-mod [@mention]`,
            aliases: ['del-mod'],
        });
    }

    async run(M) {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 1) return M.reply('👋 Hey there! Could you tag the user you want to demote, please?')
        const mentioned = users
        await this.client.DB.updateUser(users[0], 'mod', 'set', false);
        await this.client.loadMods()
        return M.reply(`Successfully removed @${users[0].split('@')[0]} from mod`, 'text', undefined, undefined, undefined, mentioned)
    }
}
