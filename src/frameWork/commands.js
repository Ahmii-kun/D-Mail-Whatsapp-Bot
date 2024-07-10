import fs from 'fs'
import path, { join } from 'path';
const __dirname = path.resolve();
import chalk from 'chalk'

export default class CommandLoader {
    constructor(client) {
        this.client = client;
        this.commandsPath = path.join(__dirname, 'src', 'Commands');
        this.commands = new Map();
        this.aliases = new Map();
    }

    loadCommands = async () => {
        try {
            if (fs.existsSync(this.commandsPath)) {
                const folders = fs.readdirSync(this.commandsPath);
                for (const folder of folders) {
                    const folderPath = path.join(this.commandsPath, folder);
                    if (fs.statSync(folderPath).isDirectory()) {
                        const files = fs.readdirSync(folderPath);
                        for (const file of files) {
                            const filePath = path.join(folderPath, file);
                            if (file.endsWith('.js')) {
                                const { default: Command } = await import(`../Commands/${folder}/${file}`);
                                const command = new Command();
                                command.client = this.client;
                                command.cmd = this;
                                if (command.name && command.config) {
                                    this.commands.set(command.name, command);
                                    command.config.aliases.forEach((cmdName) =>
                                        this.commands.set(cmdName, command)
                                    );
                                } else {
                                    this.client.log(
                                        `Invalid command structure in file: ${filePath}`,
                                        'error'
                                    );
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
            throw error;
        }
    };
    
}
