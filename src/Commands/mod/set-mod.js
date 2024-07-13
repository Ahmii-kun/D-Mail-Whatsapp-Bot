import BaseCommand from '../../frameWork/Command/base.js';

export default class SetCommand extends BaseCommand {
    constructor() {
        super('set-mod', {
            description: "set-mod",
            category: 'dev',
            usage: `set-mod [@mention]`,
            aliases: ['add-mod'],
        });
    }

    async run(M) {
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 1) return M.reply('👋 Hey there! Could you tag the user you want to demote, please?')
        const mentioned = users
        await this.client.DB.updateUser(users[0], 'mod', 'set', true);
        await this.client.loadMods()
        return M.reply(`Successfully made @${users[0].split('@')[0]} mod`, 'text', undefined, undefined, undefined, mentioned)
    }
}
