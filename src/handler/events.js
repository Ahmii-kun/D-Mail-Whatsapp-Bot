import chalk from 'chalk'
import { Sticker } from 'wa-sticker-formatter'

export default class EventHandler {
    constructor(client) {
        this.client = client;
        this.greetings = [
            '{x} just joined the party!',
            'Behold, a wild {x} has appeared!',
            '{x} hopped right into the group!',
            'Greetings, for {x} has arrived!',
            'Welcome, {x}, to the group. Did you happen to bring some pizza?',
            "{x} is here. Let's grab a beer!",
            '{x} has entered the scene. How about a refreshing cold one?',
            "Ah, {x}, you've finally made it!",
            'Well, look who\'s here – {x}. I wonder if they have their tea with them.',
            'Oh, {x}, you decided to show up. I thought you might take a while.',
            'Great to have you here, {x}.',
            "What a delight to see you, {x}."
        ];
        this.farewells = [
            '{x} has departed from the party.',
            '{x} decided to leave the group.',
            '{x} has bid adieu to the group. We hope you enjoyed your time.',
            "Well {x}, it seems the time has come for you to take your leave.",
            'Farewell, {x}.',
            "It's been a pleasure getting to know you, {x}.",
            'Take good care, {x}.',
            'Until we meet again, {x}.',
            'Catch you on the flip side, {x}.',
            'Goodbye, {x}.',
            'Until the next rendezvous, {x}.',
            'Looking forward to our paths crossing again, {x}.',
            'Safe travels, {x}.',
            'Wishing you all the best, {x}.'
        ];
        this.demotions = [
            "{x}, you're fired!",
            "Adminship isn't for you {x}.",
            "{x}, you had a good run, but you're no longer an admin.",
            "Well, I don't know how to tell you this, but {x} has been demoted.",
            '{x} has been demoted. I hope you enjoyed your admin run.'
        ];
        this.promotions = [
            "{x}, you're an admin!",
            "Welcome {x}, you're an admin!",
            "{x}, you're an admin! I hope you take care of us",
            "Well, you're an admin now {x}.",
            "Looks like you're an admin now {x}."
        ];
        this.map = {
            add: this.greetings,
            remove: this.farewells,
            demote: this.demotions,
            promote: this.promotions
        };
    }

    handleEvents = async(event) => {
        const group = await this.fetchGroupMetadata(event.jid);
        this.logEvent(event, group);
        this.handleMods(event)

        const { bot } = await this.client.DB.getGroup(event.jid);
        const groupStatus = await this.client.DB.getGroup(event.jid);
        const welcome = JSON.parse(groupStatus.welcome) || false;
        const goodbye = JSON.parse(groupStatus.goodbye) || false;

        
        if (
            bot.toLowerCase() !== 'on' ||
            (event.action === 'remove' &&
                event.participants.includes(
                    `${(this.client.user?.id || '').split('@')[0].split(':')[0]}@s.whatsapp.net`
                ))
        ) {
            return;
        }
        
        if (welcome && event.action === 'add') {
            const customGreetings = groupStatus.Greetings;
            const messages = customGreetings && customGreetings.custom
                ? customGreetings.message
                : this.greetings;
            await this.sendMessages(event.jid, event.participants, messages, customGreetings.custom);
        }

        if (goodbye && event.action === 'remove') {
            const customFarewells = groupStatus.Farewells;
            const messages = customFarewells && customFarewells.custom
                ? customFarewells.message 
                : this.farewells;
            await this.sendMessages(event.jid, event.participants, messages, customFarewells.custom);
        }
    }

    fetchGroupMetadata = async(jid) => {
        try {
            const res = await this.client.groupMetadata(jid);
            return {
                subject: res.subject,
                description: res.desc || 'No Description'
            };
        } catch (error) {
            return {
                subject: '__',
                description: ''
            };
        }
    }

    logEvent = (event, group) => {
        this.client.log(
            `${chalk.blueBright('EVENT')} ${chalk.green(
                `${this.client.utils.capitalize(event.action)}[${event.participants.length}]`
            )} in ${chalk.cyanBright(group.subject)}`
        );
    }

    sendMessages = async(jid, participants, messages, custom) => {
        for (const user of participants) {
            if (custom) {
                await this.client.sendMessage(jid, {
                text: messages,
                mentions: [user]
            })} else {
            const text = messages[Math.floor(Math.random() * messages.length)]?.replace('{x}', `@${user.split('@')[0]}`);
            await this.client.sendMessage(jid, {
                text,
                mentions: [user]
            })
        }}
    }

    handleCall = async (call) => {
        const caller = call.from
        const { username } = await this.client.interface.getContact(caller)
        this.client.log(`${chalk.cyanBright('Call')} from ${chalk.blueBright(username)}`)
        const { rejectcall } = await this.client.DB.fetchUser(this.client.config.owner)
        if (rejectcall) {
        await this.client.rejectCall(call)
        }
    }

    handleDeletedMessages = async (group) => {
        try {
            const { bot } = await this.client.DB.getGroup(group.jid);
            const groupStatus = await this.client.DB.getGroup(group.jid);
            const antidelete = JSON.parse(groupStatus.antidelete) || false;
            
            if (this.isGroupChat(group)) {
            if (!this.isBotInGroup(bot) || !antidelete) {
                return;
            }}            
            if (this.isInitiator(group)) return

            const groupid = this.getGroupId(group);
            const messages = this.client.messages.get(group.jid);
            const groupKey = group.key;
            const deletedBy = this.deletedBy(group)
            
            for (const message of messages) {
                if (message.key.id === groupKey?.id) {
                    const content = this.getMessageContent(message);
                    await this.notifyDeletedMessage(group.M, groupid, deletedBy, content, message);
                    break;
                }
            }
        } catch (error) {
            console.error("Error handling deleted messages:", error);
        }
    };

    isInitiator = (group) => group.M.sender.jid == this.client.config.owner;

    isGroupChat = (group) => group.M.chat === "group";
    
    isBotInGroup = (bot) => bot.toLowerCase() === 'on'

    deletedBy = (group) => group.M.chat === "group" ? group.M.message.key.participant : group.M.message.key.remoteJid
    
    getGroupId = (group) => group.M.chat !== "group" ? this.client.config.owner : group.jid;
    
    getMessageContent = (message) => {
        if (message.message?.templateButtonReplyMessage) {
            return message.message.templateButtonReplyMessage.selectedId || "";
        }
    
        if (message.message?.interactiveResponseMessage?.nativeFlowResponseMessage) {
            const paramsJson = JSON.parse(message.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson || "{}");
            return paramsJson.id || "";
        }
    
        if (message.message?.conversation) {
            return message.message.conversation;
        }
    
        if (message.message?.extendedTextMessage?.text) {
            return message.message.extendedTextMessage.text;
        }
    
        if (message.message?.imageMessage?.caption) {
            return message.message.imageMessage.caption;
        }
    
        if (message.message?.videoMessage?.caption) {
            return message.message.videoMessage.caption;
        }
    
        return "";
    };
    
    downloadMedia = async (M, message) => {
        try {
            return await M.downloadMediaMessage(message.message);
        } catch (error) {
            console.error(`Error downloading`, error);
            return null;
        }
    };
    
    notifyDeletedMessage = async (M, groupid, deletedBy, content, message) => {
        const deletedByUser = `@${deletedBy.split('@')[0]}`;
        const mention = [deletedBy];
    
        if (message.message?.imageMessage) {
            const imageBuffer = await this.downloadMedia(M, message);
            if (imageBuffer) {
                const baseMessage = {
                    image: imageBuffer,
                    mentions: mention
                };
                if (content) {
                    baseMessage.caption = `*Message deleted by: ${deletedByUser}*\n\n*Content:* *${content}*`;
                } else {
                    baseMessage.caption = `*Message deleted by: ${deletedByUser}*`;
                }
                await this.client.sendMessage(groupid, baseMessage);
            }
        } else if (message.message?.videoMessage) {
            const videoBuffer = await this.downloadMedia(M, message);
            if (videoBuffer) {
                const baseMessage = {
                    video: videoBuffer,
                    mentions: mention
                };
                if (content) {
                    baseMessage.caption = `*Message deleted by: ${deletedByUser}*\n\n*Content:* *${content}*`;
                } else {
                    baseMessage.caption = `*Message deleted by: ${deletedByUser}*`;
                }
                await this.client.sendMessage(groupid, baseMessage);
            }
        } else if (message.message?.stickerMessage) {
            const stickerBuffer = await this.downloadMedia(M, message);
        if (stickerBuffer) {
            const sticker = new Sticker(stickerBuffer, {
                categories: [],
                pack: 'Made by',
                author: 'D-Mail',
                quality: 90, 
                type: 'default' 
            });
            await M.replyraw(groupid, await sticker.build(), 'sticker')
        }
            await this.client.sendMessage(groupid, {
                text: `*Message deleted by: ${deletedByUser}*`,
                mentions: mention
            });
        } else {
            await this.client.sendMessage(groupid, {
                text: `*Message deleted by: ${deletedByUser}*\n\n*Content:* *${content}*`,
                mentions: mention
            });
        }
    };

    handleMods = async (event) => {
        const botId = this.client.correctJid(this.client.user?.id || '');
        const PROMOTE_ACTION = 'promote';
        const DEMOTE_ACTION = 'demote';
        if (event.action !== PROMOTE_ACTION && event.action !== DEMOTE_ACTION) return;
        if (event.initiator === botId) return;
        try {
            const { antiadmin } = await this.client.DB.getGroup(event.jid);

            if (antiadmin) {
                const participant = event.participants[0];
                let actionToTake, messageText;

                switch (event.action) {
                    case PROMOTE_ACTION:
                        actionToTake = DEMOTE_ACTION;
                        messageText = `*Antiadmin is enabled, making new admins is not allowed. Demoting @${participant.split('@')[0]}*\n\n*Initiator: @${event.initiator.split('@')[0]}*`;
                        break;
                    case DEMOTE_ACTION:
                        actionToTake = PROMOTE_ACTION;
                        messageText = `*Antiadmin is enabled, removing admins is not allowed. Promoting @${participant.split('@')[0]}*\n\n*Initiator: @${event.initiator.split('@')[0]}*`;
                        break;
                    default:
                        return;
                }

                await this.client.groupParticipantsUpdate(event.jid, [participant], actionToTake);
                await this.client.sendMessage(event.jid, { text: messageText, mentions: [participant, event.initiator] });
            }
        } catch (error) {
            console.error(`Error handling mod action: ${event.action} for event: ${JSON.stringify(event)} - `, error);
        }
    };
}

