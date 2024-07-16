import BaseCommand from '../../frameWork/Command/base.js';
import pm2 from "pm2";

export default class restart extends BaseCommand {
    constructor() {
        super('restart', {
            description: "restarts bot",
            category: 'dev',
            usage: `restart`,
            dm: true,
            aliases: ['reboot'],
        });
    }

    async run(M) {
        try {
            M.reply('Restarting...')
            pm2.restart(`app`);
        } catch (error) {
            M.reply(error.message)
        }
    }
}


