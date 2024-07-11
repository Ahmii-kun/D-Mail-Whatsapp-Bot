import BaseCommand from '../../frameWork/Command/base.js';

export default class DisableCommand extends BaseCommand {
    constructor() {
        super('disable', {
            description: "Disables a certain feature of a group",
            category: 'group',
            adminRequired: true,
            usage: `disable [feature]`,
            aliases: ['disable'],
        });

        this.info = [
            { feature: 'welcome' },
            { feature: 'goodbye' },
            { feature: 'antilink' },
            { feature: 'chatbot' },
            { feature: 'antidelete' },
            { feature: 'antiadmin' },
            { feature: 'statusview', user: true },
            { feature: 'rejectcall', user: true }
        ];
    }

    async run(M, { context }) {
        if (!context) {
            let text = `❌ *Available Features to Disable* ❌`;
            for (const info of this.info) {
                text += `\n\n- ${info.feature}`;
            }
            return void M.reply(text);
        }

        const feature = context.split(' ')[0].toLowerCase().trim();
        const featureInfo = this.info.find((info) => info.feature === feature);
        
        if (!featureInfo) {
            return void M.reply(`*Invalid option.* Use *${this.client.config.prefix}disable* to see all available features to disable`);
        }

        if (featureInfo.user) {
            if (M.sender.jid !== this.client.config.owner) return M.reply('FOR OWNER ONLY')
            const user = await this.client.DB.fetchUser(M.sender.jid);
            if (!user[featureInfo.feature]) return void M.reply(`🟡 ${featureInfo.feature} is already disabled, Baka!`);
            await this.client.DB.updateUser(M.sender.jid, featureInfo.feature, 'set', false);
            return void M.reply(`🔴 Successfully disabled ${featureInfo.feature}.`);
        } else {
        const group = await this.client.DB.getGroup(M.from);
        
        if (!group[feature]) {
            return void M.reply(`🟡 ${feature} is already disabled, Baka!`);
        }

        await this.client.DB.updateGroup(M.from, feature, false);
        return void M.reply(`🔴 Successfully disabled ${feature}`);
    }
}
}
