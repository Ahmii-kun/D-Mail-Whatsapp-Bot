import BaseCommand from '../../frameWork/Command/base.js';

export default class PromoteCommand extends BaseCommand {
    constructor() {
        super('promote', {
            description: "promotes a user in a group",
            category: 'group',
            adminRequired: true,
            usage: `promote`,
            aliases: ['promote'],
        });
    }

    async run(M) {
        if (!M.groupMetadata) return M.reply('*Whoops, something went wrong! Try again!*')
        const users = M.mentioned
        if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
        if (!users.length || users.length < 1) return M.reply('👋 Hey there! Could you tag the user you want to promote, please?')
        const mentioned = users
        let promotionAnnouncement = '';
        for (const user of users) {
            const userTag = `@${user.split('@')[0]}`;
            if (M.groupMetadata.admins?.includes(user)) {
                promotionAnnouncement += `❌ Hey, ${userTag} is already an admin. No need to promote. \n`;
                continue
            }
            await this.client.groupParticipantsUpdate(M.from, [user], 'promote')
            promotionAnnouncement += `✅ Congratulations! ${userTag} Senpai 🥳, you have been *Promoted* Successfully by *${M.sender.username}*! 🎉\n`;
        }
        return M.reply(promotionAnnouncement, 'text', undefined, undefined, undefined, mentioned)
    }
}
