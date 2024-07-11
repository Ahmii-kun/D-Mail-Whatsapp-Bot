export default class BaseCommand {
    constructor(name, config) {
        this.name = name;
        this.config = config;
        this.client = null; 
        this.handler = null; 
    }

    async run(M, args) {
        throw new Error('Command method not implemented');
    }
}
