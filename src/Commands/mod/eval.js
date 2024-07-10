import BaseCommand from '../../frameWork/Command/base.js';

export default class Eval extends BaseCommand {
    constructor() {
        super('eval', {
            description: "Evaluates JavaScript",
            category: 'dev',
            usage: `eval [JavaScript code]`,
            dm: true,
            aliases: ['eval'],
        });
    }

    async run(M,{ context }) {
        let out
        try {
            const result = eval(context)
            out = JSON.stringify(result, null, '\t') || 'Evaluated JavaScript'
        } catch (error) {
            out = error.message
        }
        return void M.reply(out)
    }
}


