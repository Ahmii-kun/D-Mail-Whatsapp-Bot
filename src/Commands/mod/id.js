import BaseCommand from '../../frameWork/Command/base.js';

export default class ID extends BaseCommand {
    constructor() {
        super('id', {
            description: "get id of the group",
            category: 'dev',
            usage: `id`,
            aliases: ['id'],
        });
    }

    async run(M) {
        return void M.reply(M.from)
    }
}