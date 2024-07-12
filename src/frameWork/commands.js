import fs from 'fs';
import path, { join } from 'path';
const __dirname = path.resolve();
import chalk from 'chalk';

export default class CommandLoader {
    constructor(client) {
        this.client = client;
        this.commandsPath = join(__dirname, 'src', 'Commands');
        this.commands = new Map();
        this.aliases = new Map();
    }

    loadCommands = async () => {
        try {
            if (fs.existsSync(this.commandsPath)) {
                const folders = fs.readdirSync(this.commandsPath);
                for (const folder of folders) {
                    const folderPath = join(this.commandsPath, folder);
                    if (fs.statSync(folderPath).isDirectory()) {
                        const files = fs.readdirSync(folderPath);
                        for (const file of files) {
                            const filePath = join(folderPath, file);
                            if (file.endsWith('.js')) {
                                try {
                                    const { default: Command } = await import(`../Commands/${folder}/${file}`);
                                    const commandInstance = new Command();
                                    commandInstance.client = this.client;
                                    commandInstance.cmd = this;
                                    if (commandInstance.name && commandInstance.config) {
                                        this.commands.set(commandInstance.name, commandInstance);
                                        if (commandInstance.config.aliases) {
                                            commandInstance.config.aliases.forEach((cmdName) =>
                                                this.aliases.set(cmdName, commandInstance)
                                            );
                                        }
                                    } else {
                                        this.client.log(`Invalid command structure in file: ${filePath}`, true);
                                    }
                                } catch (err) {
                                    this.client.log(err.message, true);
                                }
                            }
                        }
                    }
                }
                return this.commands;
            } else {
                throw new Error('Commands directory not found.');
            }
        } catch (error) {
            this.client.log(chalk.red('Error loading commands'), error);
            throw error;
        }
    };
}
