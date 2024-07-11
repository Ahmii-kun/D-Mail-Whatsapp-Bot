import BaseCommand from '../../frameWork/Command/base.js';

export default class HelpCommand extends BaseCommand {
    constructor() {
        super('help', {
            description: "Displays the bot's usable commands",
            category: 'core',
            usage: `help || help <command_name>`,
            aliases: ['h'],
            exp: 20,
        });
    }

    async run(M, { context }) {
        const { capitalize } = this.client.utils;
        const prefix = this.client.config.prefix;
        const commands = Array.from(this.client.commands.commands.values());
        const categoryIcons = {
            core: "🔧", Fun: "🎭", dev: "🔒", utilities: "🛠️", cards: "🃏", characters: "👤", 
            economy: "💰", Essentials: "🔑", games: "🎮", media: "🎞️", Schedules: "⏰", AudioTools: "🔊",
            pokemon: "🐾", RPG: "🛡️", Search: "🔍", weeb: "🌸", Design: "🎨", ImageEdit: "🖌️",
            moderation: "👥", Ai: "🧠"
        };
    
        if (!context) {
            const senderId = M.sender.jid.split('@')[0];
            let message = `🤖 Greetings *@${senderId}*, I am *${this.client.config.name}*\n\n🔖 *Prefix*: [ ${prefix} ]\n\n📚 *Here are the commands you can use*:\n\n`;
    
            let categories = new Set(commands
                .filter(({ config }) => config.category !== 'dev' || M.sender.isMod)
                .map(({ config }) => config.category)
            );
    
            categories.forEach(category => {
                const commandsList = commands
                    .filter(cmd => cmd.config.category === category)
                    .map(cmd => `*${cmd.name}* - ${cmd.config.description}\nUsage: \`${prefix}${cmd.config.usage}\``)
                    .join('\n\n');
                message += `\n\n${categoryIcons[category] || '📂'} *${capitalize(category)}*\n\n${commandsList}`;
            });
    
            message += `\n\n📘 *Note:* To get more information about a command, use ${prefix}help <cmd_name>. Example: *${prefix}help info*`;
            return void (await M.reply(message, 'text', undefined, undefined, undefined, [M.sender.jid]));
        } else {
            const cmdName = context.trim().toLowerCase();
            const command = this.client.commands.commands.get(cmdName) || this.client.commands.aliases.get(cmdName);
            if (!command) return void M.reply(`❌ Command not found | *"${context.trim()}"*`);
    
            const { name, config } = command;
            const aliases = config.aliases ? config.aliases.map(capitalize).join(', ') : 'None';
            const usage = config.usage.split('||').map(usage => `${prefix}${usage.trim()}`).join(' | ');
    
            return void M.reply(
                `📜 *Command:* ${capitalize(name)}\n🔹 *Aliases:* ${aliases}\n📁 *Category:* ${capitalize(config.category)}\n🚀 *Usage:* ${usage}\n📚 *Description:* ${config.description}`
            );
        }
    }
    
}
