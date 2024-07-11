import BaseCommand from '../../frameWork/Command/base.js';

export default class TagCommand extends BaseCommand {
    constructor() {
        super('tag', {
            description: "tag users in a group",
            category: 'group',
            adminRequired: true,
            usage: `tag [message]`,
            aliases: ['ping'],
        });
    }

    async run(M, { context }) {
        if (!M.groupMetadata) return void M.reply('*Try Again!*');

        const message = context ? context.trim() : M.quoted ? M.quoted.content : ''

        let text = `⚜️ *Message:* ${message}\n\n`;
        text += `🔖 *Group:* ${M.groupMetadata.subject}\n`;
        text += `👥 *Members:* ${M.groupMetadata.participants.length}\n`;
        text += `👤 *Tagger: @${M.sender.jid.split('@')[0]}*\n`;

        const botJid = this.client.correctJid(this.client.user?.id || '');
        text += `🤖 *@${botJid.split('@')[0]}*\n\n`;

        const mods = [];
        const admins = [];
        const members = [];

        for (const participant of M.groupMetadata.participants) {
            const jid = participant.id;
            if (jid === M.sender.jid || jid === botJid) continue;

            if (this.client.config.mods.includes(jid)) {
                mods.push(jid);
            } else if (M.groupMetadata.admins?.includes(jid)) {
                admins.push(jid);
            } else {
                members.push(jid);
            }
        }

        mods.forEach((jid, i) => {
            text += `${i === 0 ? '\n\n' : '\n\n'}🏅 *@${jid.split('@')[0]}*`;
        });

        admins.forEach((jid, i) => {
            text += `${i === 0 && mods.length === 0 ? '\n\n' : '\n\n'}👑 *@${jid.split('@')[0]}*`;
        });

        members.forEach((jid, i) => {
            text += `${i === 0 && (mods.length === 0 && admins.length === 0) ? '\n' : '\n'}👥 *@${jid.split('@')[0]}*`;
        });

        await M.reply(
            text,
            'text',
            undefined,
            undefined,
            undefined,
            M.groupMetadata.participants.map((x) => x.id)
        );
    }
}
