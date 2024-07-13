import { QuickDB } from 'quick.db';
import { MongoDriver } from 'quickmongo';
import moment from 'moment-timezone';

class Database {
    constructor(client) {
        this.Client = client
        this.dbName = process.env.OWNER
        this.uri = process.env.MONGO || `mongodb+srv://Eclipse:Eclipse@eclipse.w9mygzp.mongodb.net/${this.dbName}?retryWrites=true&w=majority`; 
        this.client = new MongoDriver(this.uri);
    }

    connect = () => {
        return new Promise((resolve) => {
            this.client
                .connect()
                .then(() => {
                    this.Client.log('Database connected!')
                    this.db = new QuickDB({ driver: this.client });
                    this.user = this.db.table('users');
                    this.group = this.db.table('groups');
                    this.chat = this.db.table('chats');
                    this.contact = this.db.table('contacts');
                    this.session = this.db.table('sessions');

                    resolve({ connected: true })
                })
                .catch((err) => {
                    console.log(err)
                    resolve({ connected: false })
                })
        })
    }

    async fetchUser(id) {
        let user = await this.user.get(id) || (await this.createUser(id));
        return user;
    }

    async createUser(id) {
        const user = {
            id,
            name: '',
            mod: false,
            statusview: false,
            rejectcall: false,
            afk: { custom: false, reason: '', time: new Date() },
            ban: { banned: false, bannedBy: '', bannedIn: '', time: '', reason: '' },
        };
        await this.user.set(id, user);
        return user;
    }

    async getGroup(id) {
        if (!id.endsWith('@g.us')) return false
        let group = await this.group.get(id) || this.createDefaultGroup(id);
        return group;
    }

    async createDefaultGroup(id) {
        if (id === 'status@broadcast') return this.Client.log('received status@Broadcast, ...skipping', true)
        const group = {
            id,
            name: '',
            chatbot: false,
            antilink: false,
            antibot: false,
            antiadmin: false,
            antidelete: false,
            welcome: false,
            goodbye: false,
            Greetings: { custom: false, message: '' },
            Farewells: { custom: false, message: '' },
            bot: 'on',
        };
        await this.group.set(id, group);
        return group;
    }

    async updateGroup(id, field, update) {
        const group = await this.getGroup(id);
        group[field] = update;
        await this.group.set(id, group);
    }

    async getChat(chat) {
        let chatData = await this.chat.get(chat) || this.createDefaultChat(chat);
        return chatData;
    }

    async createDefaultChat(chat) {
        const chatData = {
            chat,
            state: false
        };
        await this.chat.set(chat, chatData);
        return chatData;
    }

    async updateChat(chat, update) {
        const chatData = await this.getChat(chat);
        chatData.state = update;
        await this.chat.set(chat, chatData);
    }

    async banUser(id, bannedBy, bannedIn, reason) {
        const user = await this.fetchUser(id);
        const time = moment.tz("Etc/GMT").format("MMM D, YYYY HH:mm:ss");
        user.ban = { banned: true, bannedBy, bannedIn, time, reason };
        await this.user.set(id, user);
    }

    async unbanUser(id) {
        const user = await this.fetchUser(id);
        user.ban = { banned: false, bannedBy: '', bannedIn: '', time: '', reason: '' };
        await this.user.set(id, user);
    }

    async updateUser(id, field, method, update) {
        const user = await this.fetchUser(id);
        if (method === 'inc') user[field] += Number(update);
        else user[field] = update;
        await this.user.set(id, user);
    }

    getContacts = async () => {
        const result = (await this.contact.get('contacts')) || (await this.contact.set('contacts', { ID: 'contacts', data: [] }));
        return result.data;
      };

    async getMods() {
        const allData = (await this.user.all()).map((x) => x.value?.whatsapp?.net)
        const mods = allData.filter(user => user && user.mod);
        return mods;
    }
}

export default Database;
