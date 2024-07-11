import BaseCommand from '../../frameWork/Command/base.js';

export default class HideTag extends BaseCommand {
    constructor() {
        super('hidetag', {
            description: "tags everyone in a group",
            category: 'group',
            adminRequired: true,
            usage: `hidetag [message]`,
            aliases: ['ht'],
        });
    }

    async run(M, { context }) {
        if (!M.groupMetadata) return void M.reply('*Try Again!*');

        const message = context ? context.trim() : M.quoted ? M.quoted.content : ''

        let text = `⚜️ *Message:* ${message}\n\n`;
        text += `🔖 *Group:* ${M.groupMetadata.subject}\n`;
        text += `👥 *Members:* ${M.groupMetadata.participants.length}\n`;
        text += `👤 *Tagger: @${M.sender.jid.split('@')[0]}*\n`;

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
