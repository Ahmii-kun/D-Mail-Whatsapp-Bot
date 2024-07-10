import BaseCommand from '../../frameWork/Command/base.js';

export default class EnableCommand extends BaseCommand {
    constructor() {
        super('enable', {
            description: "Enables a certain feature of a group",
            category: 'group',
            adminRequired: true,
            usage: `enable [feature]`,
            aliases: ['enable'],
        });

        this.info = [
            {
                feature: 'welcome',
                description: 'Enables the bot to welcome new members',
                emoji: '🌟'
            },
            {
                feature: 'goodbye',
                description: 'Enables the bot to give farewell to the ones who left the group',
                emoji: '🚀'
            },
            {
                feature: 'antilink',
                description: 'Enables the bot to remove the member which sent an invite link for other group (will work if and only if the bot is admin)',
                emoji: '🔗'
            },
            {
                feature: 'chatbot',
                description: 'Enables the chat bot in the group',
                emoji: '💬'
            },
            {
                feature: 'antidelete',
                description: 'Enables the bot to recover the deleted message for *Groups*',
                emoji: '📝'
            },
            {
                feature: 'antiadmin',
                description: 'Restrictions on promoting and demoting',
                emoji: '🛡️'
            },
            {
                feature: 'statusview',
                description: 'Enables the bot to read status automatically',
                emoji: '📊',
                user: true
            },
            {
                feature: 'rejectcall',
                description: 'Enables the bot to reject calls',
                emoji: '📞',
                user: true
            }
        ];
        
    }

    async run(M, { context }) {
        if (!context) {
            let text = `🚀 *Available Features* 🚀`;
            for (const info of this.info) {
                text += `\n\n${info.emoji} *${this.client.utils.capitalize(info.feature)}* ${info.emoji}\n📄 *Description:* ${info.description}\n🔰 *Option:* ${this.client.config.prefix}enable ${info.feature}`;
            }
            return void M.reply(text);
        }

        const feature = context.split(' ')[0].toLowerCase().trim();
        const featureInfo = this.info.find((info) => info.feature === feature);
        
        if (!featureInfo) {
            return void M.reply(`*Invalid option.* Use *${this.client.config.prefix}enable* to see all available features`);
        }

        if (featureInfo.user) {
            if (M.sender.jid !== this.client.config.owner) return M.reply('FOR OWNER ONLY')
            const user = await this.client.DB.fetchUser(M.sender.jid);
            if (user[featureInfo.feature]) return void M.reply(`🟡 ${featureInfo.feature} is already enabled, Baka!`);
            await this.client.DB.updateUser(M.sender.jid, featureInfo.feature, 'set', true);
            return void M.reply(`🟢 Successfully enabled ${featureInfo.feature}.`);
        } else {
            const group = await this.client.DB.getGroup(M.from);
            
            if (group[feature]) {
                return void M.reply(`🟡 ${feature} is already enabled, Baka!`);
            }

            await this.client.DB.updateGroup(M.from, feature, true);
            console.log(`Group updated: ${JSON.stringify(group)}`);
            return void M.reply(`🟢 Successfully enabled ${feature}`);
        }
    }
}
