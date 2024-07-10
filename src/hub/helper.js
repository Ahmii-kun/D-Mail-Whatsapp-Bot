import chalk from 'chalk';
import { makeWASocket, delay, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import pkg from '@whiskeysockets/baileys'
const { proto } = pkg
import pino from 'pino';
import Authentication from './auth.js';
import { imageSync } from 'qr-image'
import Message from '../frameWork/sanitize.js'
import { config, initializeModules } from '../config.js';

export function initConfig(context) {
  context.config = config;
  initializeModules(context);
}

export function initProperties(context) {
  context.assets = new Map();
  context.messages = new Map();
  context.contacts = new Map()
}

export function initLogger(context) {
  context.log = (text, error = false) => {
    const color = error ? 'red' : 'blue';
    const messageColor = error ? 'redBright' : 'greenBright';
    console.log(chalk[color](`[${context.config.name.toUpperCase()}]`), chalk[messageColor](text));
  };
}

export function initJID(context) {
  context.getAllGroups = async () => {
    const participatingGroups = await context.groupFetchAllParticipating();
    return Object.keys(participatingGroups);
  };

  context.correctJid = (jid) => {
    return `${jid.split("@")[0].split(":")[0]}@s.whatsapp.net`;
  };
}

export async function start() {
  const { saveState, clearState, state } = await initAuth.call(this);
  const { version } = await fetchLatestBaileysVersion();
  this.client = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    auth: state,
    version,
  });
  for (const method of Object.keys(this.client)) {
    this[method] = this.client[method];
  }
  setupEventHandlers.call(this, saveState, clearState);

  this.rejectCall = createRejectCallMethod.call(this);

  return this.client;
}

async function initAuth() {
  await this.DB.connect()
  const { useDatabaseAuth } = new Authentication(this.config.session, this)
  return await useDatabaseAuth()
}

function setupEventHandlers(saveState, clearState) {
  this.client.ev.on('call', call => this.emit('new_call', call[0]));
  this.client.ev.on('messages.upsert', ({ messages }) => handleNewMessages.call(this, messages));
  this.client.ev.on("contacts.update", async (contacts) => await this.interface.saveContacts(contacts));
  this.client.ev.on('connection.update', update => handleConnectionUpdate.call(this, update, clearState));
  this.client.ev.on('creds.update', saveState);
}

export function createRejectCallMethod() {
  return async (call) => {
    if (call.status !== 'offer') return;
    const { authState } = this.client;
    const stanza = {
      tag: 'call',
      attrs: {
        from: authState.creds.me.id,
        to: call.from,
        id: `${Date.now() / 1000}`.replace('.', '-'),
      },
      content: [{
        tag: 'reject',
        attrs: { 'call-id': call.id, 'call-creator': call.from, count: '0' },
      }],
    };
    await this.client.sendNode(stanza);
  };
}

export async function loadMods() {
  await delay(1000)
  const allMods = await this.DB.getMods();
  const Mods = allMods.map(({ id }) => id)
  const mainModID = ['923045204414@s.whatsapp.net'];
  this.config.mods = [...Mods, ...mainModID, this.config.owner];
}

export async function handleNewMessages(messages) {
  const message = new Message(messages[0], this);
  await handleGroupEvents.call(this, message);

  const from = message.from;
  if (!this.messages.has(from)) this.messages.set(from, []);
  this.messages.get(from).push(message.message);

  if (message.type === 'senderKeyDistributionMessage' && !message.content) return;
  if (message.type === 'protocolMessage' && message.message.message.protocolMessage.type === 0) {
    this.emit('msg_deleted', { jid: from, name: message.M.pushName, key: message.message.message.protocolMessage.key, M: message });
    return;
  }

  this.emit('new_message', await message.simplify());
}

export async function handleGroupEvents(message) {
  const stubActions = {
    [proto.WebMessageInfo.StubType.GROUP_CREATE]: 'new_group_joined',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_ADD]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_ADD_REQUEST_JOIN]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_INVITE]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_LEAVE]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_REMOVE]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_DEMOTE]: 'participants_update',
    [proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_PROMOTE]: 'participants_update',
  };

  const action = stubActions[message.stubType];
  if (action) {
    this.emit(action, {
      jid: message.from,
      participants: message.stubParameters,
      initiator: message.message.participant,
      action: action.split('_')[1],
    });
  }
}
const args = process.argv.slice(2);
const usePairingCode = args.includes('--code');
export function handleConnectionUpdate(update, clearState) {
  const { connection, lastDisconnect } = update;
  if (update.qr) {
    this.log(
      `QR code generated. Scan it to continue | You can also authenticate at http://localhost:${this.config.PORT}`
    );
    this.QR = imageSync(update.qr);
  }


  if (connection === 'close') {
    if ((lastDisconnect?.error)?.output?.statusCode == DisconnectReason.loggedOut) {
      this.log('Logged out...');
      clearState();
    } else {
      if ((lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
        this.log('Reconnecting...');
        setTimeout(() => this.start(), 3000);
      } else {
        this.log('Disconnected.', true);
        this.log('Deleting session and restarting');
        clearState();
        this.log('Session deleted');
        this.log('Starting...');
        setTimeout(() => this.start(), 3000);
      }
    }
  }
  if (connection === 'connecting') {
    this.condition = 'connecting';
    this.log('Connecting to WhatsApp...');
  }
  if (connection === 'open') {
    this.condition = 'connected';
    this.log('Connected to WhatsApp');
    this.emit('open');
  }
}
