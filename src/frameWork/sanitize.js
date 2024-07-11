import {
  downloadContentFromMessage,
} from "@whiskeysockets/baileys";

export default class Message {
  constructor(M, client) {
    this.client = client;
    this.message = this.M = M;
    this.id = M.key.id;
    this.from = M.key.remoteJid || "";
    this.pushName = this.M.pushName
    this.chat = this._determineChatType();
    this.sender = this._initializeSender();
    this.type = this._determineMessageType();
    this.content = this._extractContent();
    this.urls = this.client.utils.extractUrls(this.content);
    this.isBotMsg = this._isBotMessage();
    this.mentioned = this._extractMentionedJids();
    this.numbers = this.client.utils.extractNumbers(this._cleanContentFromMentions());
    this.mentionByTag = this._extractMentionedTags();
    this.quoted = this._extractQuotedMessage();
    this.emojis = this.client.utils.extractEmojis(this.content);
    this.status = this._isStatusMessage();
    this._initializeOwner() 
  }

  _determineChatType() {
    return this.from.endsWith("@s.whatsapp.net") ? "dm" : "group";
  }

  async _initializeOwner() {
    if (this.M.key.fromMe) {
      let id = await this.client.correctJid(this.client.user?.id || "") 
      const contact = { id: id, notify: this.M.pushName };
      await this.client.interface.saveContacts([contact])
    }
      }


  _initializeSender() {
    const { jid, username, isMod } = this.client.interface.getContact(
      this.chat === "dm" && this.M.key.fromMe
        ? this.client.correctJid(this.client.user?.id || "")
        : this.chat === "group"
          ? this.client.correctJid(this.M.key.participant || "")
          : this.client.correctJid(this.from)
    );
    return {
      jid,
      username,
      isMod,
      isAdmin: false,
    };
  }

  _determineMessageType() {
    return Object.keys(this.M.message || {})[0] || "conversation";
  }

  _extractContent() {
    if (this.M.message?.templateButtonReplyMessage) {
      return this.M.message.templateButtonReplyMessage.selectedId || "";
    }
    if (this.M.message?.interactiveResponseMessage?.nativeFlowResponseMessage) {
      const paramsJson = JSON.parse(this.M.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson || "{}");
      return paramsJson.id || "";
    }
    if (this.M.message?.conversation) {
      return this.M.message.conversation;
    }
    if (this.hasSupportedMediaMessage) {
      const supportedMediaType = ["imageMessage", "videoMessage"];
      for (const type of supportedMediaType) {
        const caption = this.M.message?.[type]?.caption;
        if (caption) {
          return caption;
        }
      }
    }
    if (this.M.message?.extendedTextMessage?.text) {
      return this.M.message.extendedTextMessage.text;
    }
    return "";
  }

  _isBotMessage() {
    return (this.M.key.id.startsWith("BAE5") && this.M.key.id.length === 16) ||
      (this.M.key.id.startsWith("3EB0") && this.M.key.id.length === 12);
  }

  _extractMentionedJids() {
    return (this.M.message?.[this.type === "extendedTextMessage" ? "extendedTextMessage" : ""]?.contextInfo?.mentionedJid || [])
      .filter(x => x !== null && x !== undefined);
  }

  _cleanContentFromMentions() {
    let text = this.content;
    for (const mentioned of this.mentioned) {
      text = text.replace(mentioned.split("@")[0], "");
    }
    return text;
  }

  _extractMentionedTags() {
    return this.type == "extendedTextMessage" &&
      this.M.message.extendedTextMessage.contextInfo != null
      ? this.M.message.extendedTextMessage.contextInfo.mentionedJid
      : [];
  }

  _extractQuotedMessage() {
    const quotedContext = this.M.message?.[this.type === "extendedTextMessage" ? "extendedTextMessage" : ""]?.contextInfo;
    if (!quotedContext?.quotedMessage) return null;

    const { quotedMessage, participant, stanzaId } = quotedContext;
    const type = Object.keys(quotedMessage)[0] || "conversation";
    const content = this._extractQuotedContent(quotedMessage, type);
    const { username, jid, isMod } = this.client.interface.getContact(this.client.correctJid(participant));
    return {
      sender: {
        jid,
        username,
        isMod,
        isAdmin: false,
      },
      content,
      message: quotedMessage,
      type,
      hasSupportedMediaMessage: this._hasSupportedMedia(type, quotedMessage),
      key: {
        remoteJid: this.from,
        fromMe: this.client.correctJid(participant) === this.client.correctJid(this.client.user?.id || ""),
        id: stanzaId,
        participant,
      },
    };
  }

  _extractQuotedContent(quotedMessage, type) {
    if (quotedMessage?.buttonsResponseMessage) {
      return quotedMessage.buttonsResponseMessage.selectedDisplayText || "";
    }
    if (quotedMessage?.listResponseMessage) {
      return quotedMessage.listResponseMessage.singleSelectReply.selectedRowId || "";
    }
    if (quotedMessage?.conversation) {
      return quotedMessage.conversation;
    }
    const supportedMediaType = ["imageMessage", "videoMessage"];
    if (supportedMediaType.includes(type)) {
      return supportedMediaType
        .map(type => quotedMessage[type]?.caption)
        .filter(caption => caption)[0] || "";
    }
    return quotedMessage?.extendedTextMessage?.text || "";
  }

  _hasSupportedMedia(type, message) {
    const supportedMediaType = ["imageMessage", "videoMessage"];
    return type === "buttonsMessage"
      ? supportedMediaType.includes(Object.keys(message.buttonsMessage || {})[1])
      : supportedMediaType.includes(type);
  }

  _isStatusMessage() {
    return this.M.message?.extendedTextMessage?.contextInfo?.remoteJid === "status@broadcast" || false;
  }

  async simplify() {
    if (this.chat === "dm") return this;
    try {
      const result = await this.client.groupMetadata(this.from);
      result.admins = result.participants
        .filter(x => x.admin !== null && x.admin !== undefined)
        .map(x => x.id);

      this.groupMetadata = result;
      this.sender.isAdmin = result.admins.includes(this.sender.jid);

      if (this.quoted) {
        this.quoted.sender.isAdmin = result.admins.includes(this.quoted.sender.jid);
      }
      return this;
    } catch {
      return this;
    }
  }

  get stubType() {
    return this.M.messageStubType;
  }

  get stubParameters() {
    return this.M.messageStubParameters;
  }

  async revise(conversation, key = this.M.key) {
    await this.client.relayMessage(
      this.from,
      {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: { conversation },
        },
      },
      {}
    );
  }

  reply = async (
    content,
    type = "text",
    gif,
    mimetype,
    caption,
    mentions,
    externalAdReply,
    thumbnail,
    fileName,
    options = {}
  ) => {
    if (type === "text" && Buffer.isBuffer(content))
      throw new Error("Cannot send Buffer as a text message");
    return this.client.sendMessage(
      this.from,
      {
        [type]: content,
        gifPlayback: gif,
        caption,
        mimetype,
        mentions,
        fileName,
        jpegThumbnail: thumbnail ? thumbnail.toString("base64") : undefined,
        contextInfo: externalAdReply
          ? {
            externalAdReply,
          }
          : undefined,
        footer: options.sections?.length ? `Bot` : undefined,
        sections: options.sections,
        title: options.title,
        buttonText: options.buttonText,
      },
      {
        quoted: this.M,
      }
    );
  };

  replyraw = async (
    id = this.sender.jid,
    content,
    type = "text",
    gif,
    mimetype,
    caption,
    mentions,
    externalAdReply,
    thumbnail,
    fileName,
    options = {}
  ) => {
    if (type === "text" && Buffer.isBuffer(content))
      throw new Error("Cannot send Buffer as a text message");
    return this.client.sendMessage(
      id || this.sender.jid,
      {
        [type]: content,
        gifPlayback: gif,
        caption,
        mimetype,
        mentions,
        fileName,
        jpegThumbnail: thumbnail ? thumbnail.toString("base64") : undefined,
        contextInfo: externalAdReply
          ? {
            externalAdReply,
          }
          : undefined,
        footer: options.sections?.length ? `Bot` : undefined,
        sections: options.sections,
        title: options.title,
        buttonText: options.buttonText,
      },
      {
        quoted: this.M,
      }
    );
  };

  async react(emoji, key = this.M.key) {
    await this.client.sendMessage(this.from, {
      react: {
        text: emoji,
        key,
      },
    });
  }

  async downloadMediaMessage(message) {
    let type = Object.keys(message)[0] || "conversation";
    let msg = message[type];

    if (type === "viewOnceMessage") {
      if (type === "viewOnceMessage") {
        msg = message.viewOnceMessage?.message;
        type = Object.keys(msg || {})[0] || "conversation";
      } else {
        type = Object.keys(msg || {})[1] || "conversation";
      }
      msg = msg[type];
    }

    const stream = await downloadContentFromMessage(msg, type.replace("Message", "") || "imageMessage");
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  }
}


