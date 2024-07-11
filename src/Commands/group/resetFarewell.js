import BaseCommand from '../../frameWork/Command/base.js';

export default class resetCommand extends BaseCommand {
    constructor() {
        super('reset-farewell', {
            description: "reset goodbye farewell",
            category: 'group',
            adminRequired: true,
            usage: `cf [feature]`,
            aliases: ['reset-farewell', 'rf'],
        });

        
    }

    async run(M,) {
        const farewell = {
            custom: false,
            message: ''
        }
            await this.client.DB.updateGroup(M.from, 'Farewells', farewell);
            return void M.reply(`🟢 Successfully reset custom farewell for this group.`);
        }
    }

