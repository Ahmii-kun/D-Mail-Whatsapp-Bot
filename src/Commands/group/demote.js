import BaseCommand from '../../frameWork/Command/base.js';

export default class DisableCommand extends BaseCommand {
    constructor() {
        super('demote', {
            description: "demotes a user in a group",
            category: 'group',
            adminRequired: true,
            usage: `demote`,
            aliases: ['demote'],
        });
    }

    async run(M) {
        if (!M.groupMetadata) return M.reply('*Whoops, something went wrong! Try again!*')
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 1) return M.reply('👋 Hey there! Could you tag the user you want to demote, please?')
        const mentioned = users
        let demotionAnnouncement = '';
        for (const user of users) {
            const userTag = `@${user.split('@')[0]}`;
            if (!M.groupMetadata.admins?.includes(user)) {
                demotionAnnouncement += `❌ Hey, ${userTag} is not a admin. No need to demote. \n`;
                continue
            }
            await this.client.groupParticipantsUpdate(M.from, [user], 'demote')
            demotionAnnouncement += `✅ Congratulations! ${userTag} Senpai 🥳, you have been *demoted* Successfully by *${M.sender.username}*! 🎉\n`;
        }
        return M.reply(demotionAnnouncement, 'text', undefined, undefined, undefined, mentioned)
    }
}
