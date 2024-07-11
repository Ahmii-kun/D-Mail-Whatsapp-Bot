const _0x4b8742 = _0x9654;
(function (_0x4423c6, _0x4d2d69) {
  const _0x32fbc4 = _0x9654,
    _0x137b5d = _0x4423c6();
  while (!![]) {
    try {
      const _0x49bd61 =
        -parseInt(_0x32fbc4(0x17f)) / 0x1 +
        parseInt(_0x32fbc4(0x1ab)) / 0x2 +
        parseInt(_0x32fbc4(0x18e)) / 0x3 +
        -parseInt(_0x32fbc4(0x1be)) / 0x4 +
        parseInt(_0x32fbc4(0x1a8)) / 0x5 +
        parseInt(_0x32fbc4(0x1db)) / 0x6 +
        (-parseInt(_0x32fbc4(0x1d3)) / 0x7) *
          (parseInt(_0x32fbc4(0x1c4)) / 0x8);
      if (_0x49bd61 === _0x4d2d69) break;
      else _0x137b5d["push"](_0x137b5d["shift"]());
    } catch (_0x1c9d2e) {
      _0x137b5d["push"](_0x137b5d["shift"]());
    }
  }
})(_0x383c, 0xd2883);
import { downloadContentFromMessage } from "@whiskeysockets/baileys";
function _0x9654(_0x17b685, _0x546ce5) {
  const _0x383caf = _0x383c();
  return (
    (_0x9654 = function (_0x9654b9, _0x4730b2) {
      _0x9654b9 = _0x9654b9 - 0x17e;
      let _0x21ae8d = _0x383caf[_0x9654b9];
      return _0x21ae8d;
    }),
    _0x9654(_0x17b685, _0x546ce5)
  );
}
function _0x383c() {
  const _0x14cd9c = [
    "buttonsMessage",
    "quotedMessage",
    "_extractQuotedMessage",
    "3948904XhdOKO",
    "@s.whatsapp.net",
    "conversation",
    "message",
    "extractEmojis",
    "mentioned",
    "11688552sIOBQt",
    "_determineMessageType",
    "jid",
    "client",
    "keys",
    "react",
    "messageStubParameters",
    "group",
    "_extractQuotedContent",
    "mentionedJid",
    "user",
    "filter",
    "templateButtonReplyMessage",
    "admin",
    "participant",
    "7trGhOw",
    "quoted",
    "viewOnceMessage",
    "extractUrls",
    "nativeFlowResponseMessage",
    "admins",
    "Cannot\x20send\x20Buffer\x20as\x20a\x20text\x20message",
    "getContact",
    "7253322kNhHOS",
    "sendMessage",
    "contextInfo",
    "split",
    "groupMetadata",
    "_isStatusMessage",
    "startsWith",
    "status@broadcast",
    "numbers",
    "extendedTextMessage",
    "imageMessage",
    "_extractMentionedTags",
    "237812csAIpb",
    "stubParameters",
    "length",
    "remoteJid",
    "chat",
    "fromMe",
    "text",
    "caption",
    "map",
    "key",
    "interface",
    "videoMessage",
    "_determineChatType",
    "messageStubType",
    "title",
    "3478782RtSTQX",
    "type",
    "sender",
    "_isBotMessage",
    "selectedRowId",
    "BAE5",
    "utils",
    "includes",
    "replyraw",
    "replace",
    "sections",
    "from",
    "downloadMediaMessage",
    "_extractContent",
    "singleSelectReply",
    "paramsJson",
    "Message",
    "extractNumbers",
    "selectedId",
    "base64",
    "isBotMsg",
    "listResponseMessage",
    "3EB0",
    "status",
    "toString",
    "revise",
    "1929640AXtIrg",
    "saveContacts",
    "_initializeSender",
    "1588074GkIOcc",
    "relayMessage",
    "buttonsResponseMessage",
    "buttonText",
    "_hasSupportedMedia",
    "content",
    "_extractMentionedJids",
    "parse",
    "correctJid",
    "interactiveResponseMessage",
    "mentionByTag",
    "Bot",
    "pushName",
    "_cleanContentFromMentions",
    "_initializeOwner",
    "hasSupportedMediaMessage",
  ];
  _0x383c = function () {
    return _0x14cd9c;
  };
  return _0x383c();
}
export default class Message {
  constructor(_0x4ed40a, _0xc3b1f0) {
    const _0x386841 = _0x9654;
    (this["client"] = _0xc3b1f0),
      (this[_0x386841(0x1c1)] = this["M"] = _0x4ed40a),
      (this["id"] = _0x4ed40a[_0x386841(0x188)]["id"]),
      (this[_0x386841(0x199)] =
        _0x4ed40a[_0x386841(0x188)][_0x386841(0x182)] || ""),
      (this["pushName"] = this["M"][_0x386841(0x1b7)]),
      (this[_0x386841(0x183)] = this["_determineChatType"]()),
      (this[_0x386841(0x190)] = this[_0x386841(0x1aa)]()),
      (this["type"] = this["_determineMessageType"]()),
      (this[_0x386841(0x1b0)] = this[_0x386841(0x19b)]()),
      (this["urls"] = this[_0x386841(0x1c7)]["utils"][_0x386841(0x1d6)](
        this[_0x386841(0x1b0)]
      )),
      (this[_0x386841(0x1a2)] = this[_0x386841(0x191)]()),
      (this["mentioned"] = this[_0x386841(0x1b1)]()),
      (this[_0x386841(0x1e3)] = this[_0x386841(0x1c7)]["utils"][
        _0x386841(0x19f)
      ](this["_cleanContentFromMentions"]())),
      (this[_0x386841(0x1b5)] = this[_0x386841(0x17e)]()),
      (this[_0x386841(0x1d4)] = this[_0x386841(0x1bd)]()),
      (this["emojis"] = this[_0x386841(0x1c7)][_0x386841(0x194)][
        _0x386841(0x1c2)
      ](this["content"])),
      (this[_0x386841(0x1a5)] = this[_0x386841(0x1e0)]()),
      this["_initializeOwner"]();
  }
  [_0x4b8742(0x18b)] = () => {
    const _0x532676 = _0x4b8742;
    return this[_0x532676(0x199)]["endsWith"](_0x532676(0x1bf))
      ? "dm"
      : "group";
  };
  [_0x4b8742(0x1b9)] = async () => {
    const _0x399669 = _0x4b8742;
    if (this["M"][_0x399669(0x188)][_0x399669(0x184)]) {
      let _0x198d39 = await this[_0x399669(0x1c7)][_0x399669(0x1b3)](
        this["client"][_0x399669(0x1ce)]?.["id"] || ""
      );
      const _0x323964 = { id: _0x198d39, notify: this["M"][_0x399669(0x1b7)] };
      await this[_0x399669(0x1c7)][_0x399669(0x189)][_0x399669(0x1a9)]([
        _0x323964,
      ]);
    }
  };
  [_0x4b8742(0x1aa)] = () => {
    const _0x3463c4 = _0x4b8742,
      {
        jid: _0x44724d,
        username: _0x1208e3,
        isMod: _0x3dd4d7,
      } = this["client"][_0x3463c4(0x189)][_0x3463c4(0x1da)](
        this[_0x3463c4(0x183)] === "dm" && this["M"][_0x3463c4(0x188)]["fromMe"]
          ? this["client"][_0x3463c4(0x1b3)](
              this["client"][_0x3463c4(0x1ce)]?.["id"] || ""
            )
          : this[_0x3463c4(0x183)] === _0x3463c4(0x1cb)
          ? this["client"][_0x3463c4(0x1b3)](
              this["M"]["key"][_0x3463c4(0x1d2)] || ""
            )
          : this[_0x3463c4(0x1c7)][_0x3463c4(0x1b3)](this["from"])
      );
    return {
      jid: _0x44724d,
      username: _0x1208e3,
      isMod: _0x3dd4d7,
      isAdmin: ![],
    };
  };
  [_0x4b8742(0x1c5)] = () => {
    const _0x52136d = _0x4b8742;
    return (
      Object[_0x52136d(0x1c8)](this["M"][_0x52136d(0x1c1)] || {})[0x0] ||
      _0x52136d(0x1c0)
    );
  };
  [_0x4b8742(0x19b)] = () => {
    const _0xf17090 = _0x4b8742;
    if (this["M"][_0xf17090(0x1c1)]?.[_0xf17090(0x1d0)])
      return (
        this["M"][_0xf17090(0x1c1)][_0xf17090(0x1d0)][_0xf17090(0x1a0)] || ""
      );
    if (
      this["M"][_0xf17090(0x1c1)]?.["interactiveResponseMessage"]?.[
        _0xf17090(0x1d7)
      ]
    ) {
      const _0x133d30 = JSON[_0xf17090(0x1b2)](
        this["M"][_0xf17090(0x1c1)][_0xf17090(0x1b4)][_0xf17090(0x1d7)][
          _0xf17090(0x19d)
        ] || "{}"
      );
      return _0x133d30["id"] || "";
    }
    if (this["M"][_0xf17090(0x1c1)]?.[_0xf17090(0x1c0)])
      return this["M"][_0xf17090(0x1c1)][_0xf17090(0x1c0)];
    if (this[_0xf17090(0x1ba)]) {
      const _0xb492f3 = ["imageMessage", _0xf17090(0x18a)];
      for (const _0x13e9e9 of _0xb492f3) {
        const _0x3de80d =
          this["M"][_0xf17090(0x1c1)]?.[_0x13e9e9]?.[_0xf17090(0x186)];
        if (_0x3de80d) return _0x3de80d;
      }
    }
    if (this["M"][_0xf17090(0x1c1)]?.[_0xf17090(0x1e4)]?.[_0xf17090(0x185)])
      return this["M"][_0xf17090(0x1c1)][_0xf17090(0x1e4)][_0xf17090(0x185)];
    return "";
  };
  [_0x4b8742(0x191)] = () => {
    const _0x3b6940 = _0x4b8742;
    return (
      (this["M"][_0x3b6940(0x188)]["id"]["startsWith"](_0x3b6940(0x193)) &&
        this["M"][_0x3b6940(0x188)]["id"][_0x3b6940(0x181)] === 0x10) ||
      (this["M"][_0x3b6940(0x188)]["id"][_0x3b6940(0x1e1)](_0x3b6940(0x1a4)) &&
        this["M"]["key"]["id"][_0x3b6940(0x181)] === 0xc)
    );
  };
  [_0x4b8742(0x1b1)] = () => {
    const _0x1eb698 = _0x4b8742;
    return (this["M"][_0x1eb698(0x1c1)]?.[
      this[_0x1eb698(0x18f)] === "extendedTextMessage" ? _0x1eb698(0x1e4) : ""
    ]?.[_0x1eb698(0x1dd)]?.[_0x1eb698(0x1cd)] || [])[_0x1eb698(0x1cf)](
      (_0x43ca98) => _0x43ca98 !== null && _0x43ca98 !== undefined
    );
  };
  [_0x4b8742(0x1b8)] = () => {
    const _0x335c18 = _0x4b8742;
    let _0x466d49 = this[_0x335c18(0x1b0)];
    for (const _0x5b3e5d of this[_0x335c18(0x1c3)]) {
      _0x466d49 = _0x466d49[_0x335c18(0x197)](
        _0x5b3e5d[_0x335c18(0x1de)]("@")[0x0],
        ""
      );
    }
    return _0x466d49;
  };
  [_0x4b8742(0x17e)] = () => {
    const _0x13bf8d = _0x4b8742;
    return this[_0x13bf8d(0x18f)] == _0x13bf8d(0x1e4) &&
      this["M"][_0x13bf8d(0x1c1)][_0x13bf8d(0x1e4)]["contextInfo"] != null
      ? this["M"]["message"][_0x13bf8d(0x1e4)]["contextInfo"][_0x13bf8d(0x1cd)]
      : [];
  };
  [_0x4b8742(0x1bd)] = () => {
    const _0x4a2388 = _0x4b8742,
      _0xf961c4 =
        this["M"]["message"]?.[
          this[_0x4a2388(0x18f)] === _0x4a2388(0x1e4)
            ? "extendedTextMessage"
            : ""
        ]?.[_0x4a2388(0x1dd)];
    if (!_0xf961c4?.[_0x4a2388(0x1bc)]) return null;
    const {
        quotedMessage: _0xcc6ac4,
        participant: _0xbe5bbb,
        stanzaId: _0x1515ba,
      } = _0xf961c4,
      _0x3b3afe = Object[_0x4a2388(0x1c8)](_0xcc6ac4)[0x0] || _0x4a2388(0x1c0),
      _0x3ded02 = this["_extractQuotedContent"](_0xcc6ac4, _0x3b3afe),
      {
        username: _0x352b89,
        jid: _0x38ba5c,
        isMod: _0x1aff5f,
      } = this[_0x4a2388(0x1c7)][_0x4a2388(0x189)][_0x4a2388(0x1da)](
        this[_0x4a2388(0x1c7)][_0x4a2388(0x1b3)](_0xbe5bbb)
      );
    return {
      sender: {
        jid: _0x38ba5c,
        username: _0x352b89,
        isMod: _0x1aff5f,
        isAdmin: ![],
      },
      content: _0x3ded02,
      message: _0xcc6ac4,
      type: _0x3b3afe,
      hasSupportedMediaMessage: this["_hasSupportedMedia"](
        _0x3b3afe,
        _0xcc6ac4
      ),
      key: {
        remoteJid: this[_0x4a2388(0x199)],
        fromMe:
          this["client"][_0x4a2388(0x1b3)](_0xbe5bbb) ===
          this[_0x4a2388(0x1c7)][_0x4a2388(0x1b3)](
            this[_0x4a2388(0x1c7)][_0x4a2388(0x1ce)]?.["id"] || ""
          ),
        id: _0x1515ba,
        participant: _0xbe5bbb,
      },
    };
  };
  [_0x4b8742(0x1cc)](_0x2d73d9, _0x2b9a54) {
    const _0x5a765f = _0x4b8742;
    if (_0x2d73d9?.[_0x5a765f(0x1ad)])
      return _0x2d73d9[_0x5a765f(0x1ad)]["selectedDisplayText"] || "";
    if (_0x2d73d9?.[_0x5a765f(0x1a3)])
      return (
        _0x2d73d9[_0x5a765f(0x1a3)][_0x5a765f(0x19c)][_0x5a765f(0x192)] || ""
      );
    if (_0x2d73d9?.[_0x5a765f(0x1c0)]) return _0x2d73d9[_0x5a765f(0x1c0)];
    const _0x269d40 = [_0x5a765f(0x1e5), _0x5a765f(0x18a)];
    if (_0x269d40[_0x5a765f(0x195)](_0x2b9a54))
      return (
        _0x269d40[_0x5a765f(0x187)](
          (_0xde1a13) => _0x2d73d9[_0xde1a13]?.["caption"]
        )[_0x5a765f(0x1cf)]((_0x5cfd8d) => _0x5cfd8d)[0x0] || ""
      );
    return _0x2d73d9?.[_0x5a765f(0x1e4)]?.[_0x5a765f(0x185)] || "";
  }
  [_0x4b8742(0x1af)](_0x49b744, _0x4f337d) {
    const _0x5468fb = _0x4b8742,
      _0x132cf4 = [_0x5468fb(0x1e5), _0x5468fb(0x18a)];
    return _0x49b744 === _0x5468fb(0x1bb)
      ? _0x132cf4[_0x5468fb(0x195)](
          Object[_0x5468fb(0x1c8)](_0x4f337d[_0x5468fb(0x1bb)] || {})[0x1]
        )
      : _0x132cf4[_0x5468fb(0x195)](_0x49b744);
  }
  ["_isStatusMessage"] = () => {
    const _0x36c965 = _0x4b8742;
    return (
      this["M"]["message"]?.[_0x36c965(0x1e4)]?.[_0x36c965(0x1dd)]?.[
        _0x36c965(0x182)
      ] === _0x36c965(0x1e2) || ![]
    );
  };
  ["simplify"] = async () => {
    const _0x4b0dac = _0x4b8742;
    if (this[_0x4b0dac(0x183)] === "dm") return this;
    try {
      const _0x1fba37 = await this["client"][_0x4b0dac(0x1df)](
        this[_0x4b0dac(0x199)]
      );
      return (
        (_0x1fba37[_0x4b0dac(0x1d8)] = _0x1fba37["participants"]
          [_0x4b0dac(0x1cf)](
            (_0x4273b5) =>
              _0x4273b5[_0x4b0dac(0x1d1)] !== null &&
              _0x4273b5[_0x4b0dac(0x1d1)] !== undefined
          )
          [_0x4b0dac(0x187)]((_0x3eeaa3) => _0x3eeaa3["id"])),
        (this["groupMetadata"] = _0x1fba37),
        (this[_0x4b0dac(0x190)]["isAdmin"] = _0x1fba37[_0x4b0dac(0x1d8)][
          _0x4b0dac(0x195)
        ](this[_0x4b0dac(0x190)][_0x4b0dac(0x1c6)])),
        this[_0x4b0dac(0x1d4)] &&
          (this["quoted"][_0x4b0dac(0x190)]["isAdmin"] = _0x1fba37[
            _0x4b0dac(0x1d8)
          ][_0x4b0dac(0x195)](this[_0x4b0dac(0x1d4)][_0x4b0dac(0x190)]["jid"])),
        this
      );
    } catch {
      return this;
    }
  };
  get ["stubType"]() {
    const _0x5a361f = _0x4b8742;
    return this["M"][_0x5a361f(0x18c)];
  }
  get [_0x4b8742(0x180)]() {
    const _0xfb515c = _0x4b8742;
    return this["M"][_0xfb515c(0x1ca)];
  }
  [_0x4b8742(0x1a7)] = async (
    _0x14d93e,
    _0x550cb4 = this["M"][_0x4b8742(0x188)]
  ) => {
    const _0x1b8af5 = _0x4b8742;
    await this[_0x1b8af5(0x1c7)][_0x1b8af5(0x1ac)](
      this[_0x1b8af5(0x199)],
      {
        protocolMessage: {
          key: _0x550cb4,
          type: 0xe,
          editedMessage: { conversation: _0x14d93e },
        },
      },
      {}
    );
  };
  ["reply"] = async (
    _0x15cf39,
    _0x2ab934 = _0x4b8742(0x185),
    _0x565f01,
    _0x3b68ec,
    _0x3d6fbe,
    _0x49dd35,
    _0x3eecea,
    _0x1ce5d0,
    _0x970164,
    _0x3a6d98 = {}
  ) => {
    const _0x70cdcb = _0x4b8742;
    if (_0x2ab934 === _0x70cdcb(0x185) && Buffer["isBuffer"](_0x15cf39))
      throw new Error(_0x70cdcb(0x1d9));
    return this[_0x70cdcb(0x1c7)]["sendMessage"](
      this[_0x70cdcb(0x199)],
      {
        [_0x2ab934]: _0x15cf39,
        gifPlayback: _0x565f01,
        caption: _0x3d6fbe,
        mimetype: _0x3b68ec,
        mentions: _0x49dd35,
        fileName: _0x970164,
        jpegThumbnail: _0x1ce5d0
          ? _0x1ce5d0[_0x70cdcb(0x1a6)]("base64")
          : undefined,
        contextInfo: _0x3eecea ? { externalAdReply: _0x3eecea } : undefined,
        footer: _0x3a6d98[_0x70cdcb(0x198)]?.["length"] ? "Bot" : undefined,
        sections: _0x3a6d98[_0x70cdcb(0x198)],
        title: _0x3a6d98[_0x70cdcb(0x18d)],
        buttonText: _0x3a6d98[_0x70cdcb(0x1ae)],
      },
      { quoted: this["M"] }
    );
  };
  [_0x4b8742(0x196)] = async (
    _0x3c8b1f = this[_0x4b8742(0x190)][_0x4b8742(0x1c6)],
    _0x125ef8,
    _0x5a70b6 = _0x4b8742(0x185),
    _0x5db336,
    _0x22b6cd,
    _0x9f1705,
    _0x25e790,
    _0x6d2088,
    _0x504c9a,
    _0xcdc937,
    _0x129ce8 = {}
  ) => {
    const _0x2ad1e6 = _0x4b8742;
    if (_0x5a70b6 === _0x2ad1e6(0x185) && Buffer["isBuffer"](_0x125ef8))
      throw new Error(_0x2ad1e6(0x1d9));
    return this["client"][_0x2ad1e6(0x1dc)](
      _0x3c8b1f || this[_0x2ad1e6(0x190)][_0x2ad1e6(0x1c6)],
      {
        [_0x5a70b6]: _0x125ef8,
        gifPlayback: _0x5db336,
        caption: _0x9f1705,
        mimetype: _0x22b6cd,
        mentions: _0x25e790,
        fileName: _0xcdc937,
        jpegThumbnail: _0x504c9a
          ? _0x504c9a[_0x2ad1e6(0x1a6)](_0x2ad1e6(0x1a1))
          : undefined,
        contextInfo: _0x6d2088 ? { externalAdReply: _0x6d2088 } : undefined,
        footer: _0x129ce8[_0x2ad1e6(0x198)]?.[_0x2ad1e6(0x181)]
          ? _0x2ad1e6(0x1b6)
          : undefined,
        sections: _0x129ce8[_0x2ad1e6(0x198)],
        title: _0x129ce8[_0x2ad1e6(0x18d)],
        buttonText: _0x129ce8[_0x2ad1e6(0x1ae)],
      },
      { quoted: this["M"] }
    );
  };
  async [_0x4b8742(0x1c9)](_0x33ae66, _0x340005 = this["M"][_0x4b8742(0x188)]) {
    const _0x52711b = _0x4b8742;
    await this[_0x52711b(0x1c7)]["sendMessage"](this[_0x52711b(0x199)], {
      react: { text: _0x33ae66, key: _0x340005 },
    });
  }
  async [_0x4b8742(0x19a)](_0x18ae32) {
    const _0x480385 = _0x4b8742;
    let _0x27d610 =
        Object[_0x480385(0x1c8)](_0x18ae32)[0x0] || _0x480385(0x1c0),
      _0x13768c = _0x18ae32[_0x27d610];
    _0x27d610 === _0x480385(0x1d5) &&
      (_0x27d610 === "viewOnceMessage"
        ? ((_0x13768c = _0x18ae32[_0x480385(0x1d5)]?.[_0x480385(0x1c1)]),
          (_0x27d610 =
            Object["keys"](_0x13768c || {})[0x0] || _0x480385(0x1c0)))
        : (_0x27d610 =
            Object[_0x480385(0x1c8)](_0x13768c || {})[0x1] || _0x480385(0x1c0)),
      (_0x13768c = _0x13768c[_0x27d610]));
    const _0x57b32c = await downloadContentFromMessage(
      _0x13768c,
      _0x27d610[_0x480385(0x197)](_0x480385(0x19e), "") || _0x480385(0x1e5)
    );
    let _0x547b17 = Buffer[_0x480385(0x199)]([]);
    for await (const _0x13ac8c of _0x57b32c) {
      _0x547b17 = Buffer["concat"]([_0x547b17, _0x13ac8c]);
    }
    return _0x547b17;
  }
}
