import { config as loadEnvConfig } from 'dotenv';
import host from "./hub/host.js"
import Utils from "./frameWork/utils.js"
import Database from "./frameWork/database.js"
import Interface from './frameWork/interface.js'
import CommandLoader from './frameWork/commands.js'
// const Contact = require("./Contact");

loadEnvConfig();

const config = {
  name: process.env.NAME || 'D-Mail',
  session: process.env.SESSION || 'session',
  prefix: process.env.PREFIX || '-',
  owner: `${process.env.OWNER}@s.whatsapp.net`,
  adminsGroup: process.env.ADMINGC || '120363047969486676@g.us',
  TENOR_API_KEY: process.env.TENOR_API_KEY || 'YOUR_TENOR_API_KEY',
  API_URL: 'https://d-mail-api.vercel.app/',
  chatBotUrl: 'http://api.brainshop.ai/get?bid=176025&key=YJBKp4WNgw4F1Pwn&uid=[uid]&msg=[msg]',
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

