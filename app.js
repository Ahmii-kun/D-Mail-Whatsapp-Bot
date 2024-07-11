import Client from './src/hub/connection.js';
import MessageHandler from './src/handler/message.js'
import EventHandler from './src/handler/events.js'

(async () => {
  const client = new Client();

  await client.start();

  const messageHandler = new MessageHandler(client)

  const { handleEvents, handleCall, handleDeletedMessages } = new EventHandler(client);

  client.on('new_message', async (M) => await messageHandler.handleMessage(M));

  client.on('participants_update', async (event) => await handleEvents(event));

  client.on('msg_deleted', async (group) => { await handleDeletedMessages(group)});

  client.on('new_call', async (call) => await handleCall(call));

  client.once('open', async () => {
    messageHandler.groups = await client.getAllGroups()  
    await client.commands.loadCommands();
    await client.loadMods()
})


})();
