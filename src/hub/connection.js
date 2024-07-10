import EventEmitter from 'events';
import { initConfig, initJID, loadMods, initProperties, initLogger, start, handleConnectionUpdate, handleNewMessages, handleGroupEvents, createRejectCallMethod } from './helper.js';

export default class Client extends EventEmitter {
  constructor() {
    super();
    initConfig(this);
    initProperties(this);
    initLogger(this);
    initJID(this)
  }

  start() {
    if (!process.env.MONGO) throw new Error('Provide Mongo url')
    return start.call(this);
  }

  handleConnectionUpdate(update, clearState) {
    handleConnectionUpdate.call(this, update, clearState);
  }

  handleNewMessages(messages) {
    handleNewMessages.call(this, messages);
  }

  handleGroupEvents(message) {
    handleGroupEvents.call(this, message);
  }

  createRejectCallMethod() {
    return createRejectCallMethod.call(this);
  }

  loadMods() {
    return loadMods.call(this);
  }

}


