import BaseCommand from '../../frameWork/Command/base.js';

export default class GreetingsCommand extends BaseCommand {
    constructor() {
        super('custom-greeting', {
            description: "set custom welcome greetings",
            category: 'group',
            adminRequired: true,
            usage: `cg [feature]`,
            aliases: ['custom-greet', 'cg'],
        });

        
    }

    async run(M, { context }) {
        if (!context) return void M.reply('Provide custom greeting please.');
        const greet = {
            custom: true,
            message: context
        }
            await this.client.DB.updateGroup(M.from, 'Greetings', greet);
            return void M.reply(`🟢 Successfully set custom greetings for this group.`);
        }
    }

