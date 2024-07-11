import BaseCommand from '../../frameWork/Command/base.js';

export default class resetCommand extends BaseCommand {
    constructor() {
        super('reset-greeting', {
            description: "reset the custom Greetings to default",
            category: 'group',
            adminRequired: true,
            usage: `cg [feature]`,
            aliases: ['reset-greet', 'rg'],
        });

        
    }

    async run(M, { context }) {
        const greet = {
            custom: false,
            message: ''
        }
            await this.client.DB.updateGroup(M.from, 'Greetings', greet);
            return void M.reply(`🟢 Successfully reset custom greetings for this group.`);
        }
    }

