import BaseCommand from '../../frameWork/Command/base.js';

export default class farewellsCommand extends BaseCommand {
    constructor() {
        super('custom-farewell', {
            description: "set custom goodbye farewell",
            category: 'group',
            adminRequired: true,
            usage: `cf [feature]`,
            aliases: ['custom-farewell', 'cf'],
        });

        
    }

    async run(M, { context }) {
        if (!context) return void M.reply('Provide custom farewell please.');
        const farewell = {
            custom: true,
            message: context
        }
            await this.client.DB.updateGroup(M.from, 'Farewells', farewell);
            return void M.reply(`🟢 Successfully set custom farewell for this group.`);
        }
    }

