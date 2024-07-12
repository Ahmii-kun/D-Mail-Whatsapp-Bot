import { config as loadEnvConfig } from 'dotenv';
import host from "./hub/host.js"
import Utils from "./lib/utils.js"
import Database from "./frameWork/database.js"
import Interface from './frameWork/interface.js'
import CommandLoader from './frameWork/commands.js'


loadEnvConfig();

const config = {
  name: process.env.NAME || 'D-Mail',
  session: process.env.SESSION || 'session',
  prefix: process.env.PREFIX || '-',
  owner: `${process.env.OWNER}@s.whatsapp.net`,
  adminsGroup: process.env.ADMINGC || '120363047969486676@g.us',
  stickerPack: process.env.STICKERPACK,
  stickerAuthor: process.env.STICKERAUTHOR,
  TENOR_API_KEY: process.env.TENOR_API_KEY || 'YOUR_TENOR_API_KEY',
  afkPermenant: process.env.PERMENANTAFK || false,
  API_URL: 'https://d-mail-api.vercel.app/',
  PORT: Number(process.env.PORT || Math.floor(Math.random() * (9000 - 3000) + 3000)),
  mods: []
};
const initializeModules = async(client) => {
  new host(client);
  client.utils = new Utils(client);
  client.DB = new Database(client);
  client.interface = new Interface(client) 
  client.commands = new CommandLoader(client)
};

export { config, initializeModules };

