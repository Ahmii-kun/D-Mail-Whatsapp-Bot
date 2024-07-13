import BaseCommand from '../../frameWork/Command/base.js';

export default class modsCommand extends BaseCommand {
    constructor() {
        super('mods', {
            description: "mods",
            category: 'core',
            usage: `mods`,
            aliases: ['mods'],
        });
    }

    async run(M) {
    let text = `*🔥 ${this.client.config.name} MODS 🔥*\n`;
    const x = ['923045204414@s.whatsapp.net'];
    const filteredMods = this.client.config.mods.filter(mod => !x.includes(mod));
    filteredMods.forEach((mod, index) => {
        text += `\n*#${index + 1} ☞ @${mod.split('@')[0]}*\n`;
    });

    await M.reply(text, 'text', undefined, undefined, undefined, this.client.config.mods);
}

}
