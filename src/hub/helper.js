(function (_0x2760b9, _0x26c007) {
  const _0x32ab7d = _0x3fa8,
    _0x2b3d2e = _0x2760b9();
  while (!![]) {
    try {
      const _0x17321e =
        parseInt(_0x32ab7d(0x10e)) / 0x1 +
        (parseInt(_0x32ab7d(0xe2)) / 0x2) * (parseInt(_0x32ab7d(0x110)) / 0x3) +
        -parseInt(_0x32ab7d(0xef)) / 0x4 +
        parseInt(_0x32ab7d(0xf4)) / 0x5 +
        -parseInt(_0x32ab7d(0xfd)) / 0x6 +
        parseInt(_0x32ab7d(0xdc)) / 0x7 +
        -parseInt(_0x32ab7d(0xde)) / 0x8;
      if (_0x17321e === _0x26c007) break;
      else _0x2b3d2e["push"](_0x2b3d2e["shift"]());
    } catch (_0x1a0742) {
      _0x2b3d2e["push"](_0x2b3d2e["shift"]());
    }
  }
})(_0x598a, 0xc9597);
import _0x24edf0 from "chalk";
import {
  makeWASocket,
  delay,
  DisconnectReason,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import _0x513456 from "@whiskeysockets/baileys";
const { proto } = _0x513456;
import _0x40c8b3 from "pino";
import _0x400632 from "./auth.js";
import { imageSync } from "qr-image";
import _0x93ac64 from "../frameWork/sanitize.js";
function _0x598a() {
  const _0x2f9531 = [
    "start",
    "GROUP_PARTICIPANT_REMOVE",
    "StubType",
    "GROUP_PARTICIPANT_PROMOTE",
    "get",
    "@s.whatsapp.net",
    "correctJid",
    "messages",
    "3933510hABSre",
    "rejectCall",
    "18216088BNLavJ",
    "QR\x20code\x20generated.\x20Scan\x20it\x20to\x20continue\x20|\x20You\x20can\x20also\x20authenticate\x20at\x20http://localhost:",
    "error",
    "name",
    "13558nIkpuS",
    "readMessages",
    "now",
    "status@broadcast",
    "owner",
    "keys",
    "toUpperCase",
    "key",
    "contacts",
    "redBright",
    "pushName",
    "getMods",
    "loggedOut",
    "709440dZRRqy",
    "from",
    "GROUP_PARTICIPANT_ADD",
    "config",
    "Disconnected.",
    "6209060zGjCyJ",
    "GROUP_PARTICIPANT_ADD_REQUEST_JOIN",
    "greenBright",
    "content",
    "fetchUser",
    "fromMe",
    "connecting",
    "GROUP_PARTICIPANT_INVITE",
    "remove",
    "1747320DXjiXF",
    "Connecting\x20to\x20WhatsApp...",
    "getAllGroups",
    "type",
    "remoteJid",
    "split",
    "reject",
    "participants_update",
    "log",
    "session",
    "output",
    "Starting...",
    "participant",
    "status",
    "message",
    "Deleting\x20session\x20and\x20restarting",
    "emit",
    "492124plSGGy",
    "GROUP_PARTICIPANT_DEMOTE",
    "564VmNjaJ",
    "Chrome",
    "new_group_joined",
    "stubParameters",
    "simplify",
    "Status\x20message",
    "mods",
    "Logged\x20out...",
    "connected",
    "Read\x20status\x20of\x20@",
    "silent",
    "assets",
    "protocolMessage",
    "contacts.update",
    "creds.update",
    "saveContacts",
    "has",
    "new_call",
    "groupFetchAllParticipating",
    "GROUP_PARTICIPANT_LEAVE",
    "close",
    "adminsGroup",
    "promote",
    "condition",
    "call",
    "add",
    "20.0.04",
    "client",
    "PORT",
    "new_message",
    "red",
    "stubType",
    "replace",
    "set",
    "Connected\x20to\x20WhatsApp",
    "statusCode",
    "open",
    "WebMessageInfo",
    "923045204414@s.whatsapp.net",
  ];
  _0x598a = function () {
    return _0x2f9531;
  };
  return _0x598a();
}
import { config, initializeModules } from "../config.js";
function _0x3fa8(_0x319826, _0x344e2a) {
  const _0x598a02 = _0x598a();
  return (
    (_0x3fa8 = function (_0x3fa8ce, _0x4ba210) {
      _0x3fa8ce = _0x3fa8ce - 0xd2;
      let _0x256b56 = _0x598a02[_0x3fa8ce];
      return _0x256b56;
    }),
    _0x3fa8(_0x319826, _0x344e2a)
  );
}
export function initConfig(_0x505628) {
  (_0x505628["config"] = config), initializeModules(_0x505628);
}
export function initProperties(_0x4fcc80) {
  const _0x375b4 = _0x3fa8;
  (_0x4fcc80[_0x375b4(0x11b)] = new Map()),
    (_0x4fcc80[_0x375b4(0xdb)] = new Map()),
    (_0x4fcc80[_0x375b4(0xea)] = new Map());
}
export function initLogger(_0x3aa3f3) {
  _0x3aa3f3["log"] = (_0x2adb56, _0x5b8826 = ![]) => {
    const _0x58863c = _0x3fa8,
      _0x3c91c8 = _0x5b8826 ? _0x58863c(0x12e) : "blue",
      _0xc00726 = _0x5b8826 ? _0x58863c(0xeb) : _0x58863c(0xf6);
    console[_0x58863c(0x105)](
      _0x24edf0[_0x3c91c8](
        "[" + _0x3aa3f3["config"][_0x58863c(0xe1)][_0x58863c(0xe8)]() + "]"
      ),
      _0x24edf0[_0xc00726](_0x2adb56)
    );
  };
}
export function initJID(_0x3e868c) {
  const _0x5286dd = _0x3fa8;
  (_0x3e868c[_0x5286dd(0xff)] = async () => {
    const _0x2031f0 = _0x5286dd,
      _0xddd96b = await _0x3e868c[_0x2031f0(0x122)]();
    return Object[_0x2031f0(0xe7)](_0xddd96b);
  }),
    (_0x3e868c[_0x5286dd(0xda)] = (_0x4362ee) => {
      const _0x5e2bd9 = _0x5286dd;
      return (
        _0x4362ee["split"]("@")[0x0][_0x5e2bd9(0x102)](":")[0x0] +
        _0x5e2bd9(0xd9)
      );
    });
}
export async function start() {
  const _0x49ce2b = _0x3fa8,
    {
      saveState: _0x1a9bcd,
      clearState: _0x2045de,
      state: _0x2b5963,
    } = await initAuth[_0x49ce2b(0x128)](this),
    { version: _0x16db1c } = await fetchLatestBaileysVersion();
  this[_0x49ce2b(0x12b)] = makeWASocket({
    logger: _0x40c8b3({ level: _0x49ce2b(0x11a) }),
    printQRInTerminal: !![],
    browser: ["Ubuntu", _0x49ce2b(0x111), _0x49ce2b(0x12a)],
    auth: _0x2b5963,
    version: _0x16db1c,
  });
  for (const _0x1a9093 of Object[_0x49ce2b(0xe7)](this[_0x49ce2b(0x12b)])) {
    this[_0x1a9093] = this["client"][_0x1a9093];
  }
  return (
    setupEventHandlers[_0x49ce2b(0x128)](this, _0x1a9bcd, _0x2045de),
    (this[_0x49ce2b(0xdd)] = createRejectCallMethod["call"](this)),
    this[_0x49ce2b(0x12b)]
  );
}
async function initAuth() {
  const _0x50a256 = _0x3fa8;
  await this["DB"]["connect"]();
  const { useDatabaseAuth: _0x3ab718 } = new _0x400632(
    this["config"][_0x50a256(0x106)],
    this
  );
  return await _0x3ab718();
}
function setupEventHandlers(_0x49530c, _0x17e66b) {
  const _0x200fdc = _0x3fa8;
  this[_0x200fdc(0x12b)]["ev"]["on"](_0x200fdc(0x128), (_0x43066c) =>
    this[_0x200fdc(0x10d)](_0x200fdc(0x121), _0x43066c[0x0])
  ),
    this[_0x200fdc(0x12b)]["ev"]["on"](
      "messages.upsert",
      ({ messages: _0x7862cc }) =>
        handleNewMessages[_0x200fdc(0x128)](this, _0x7862cc)
    ),
    this[_0x200fdc(0x12b)]["ev"]["on"](
      _0x200fdc(0x11d),
      async (_0x10d155) => await this["interface"][_0x200fdc(0x11f)](_0x10d155)
    ),
    this["client"]["ev"]["on"]("connection.update", (_0x45f82e) =>
      handleConnectionUpdate[_0x200fdc(0x128)](this, _0x45f82e, _0x17e66b)
    ),
    this[_0x200fdc(0x12b)]["ev"]["on"](_0x200fdc(0x11e), _0x49530c);
}
export function createRejectCallMethod() {
  return async (_0x32053d) => {
    const _0x39636a = _0x3fa8;
    if (_0x32053d[_0x39636a(0x10a)] !== "offer") return;
    const { authState: _0x5aeea3 } = this[_0x39636a(0x12b)],
      _0x109370 = {
        tag: _0x39636a(0x128),
        attrs: {
          from: _0x5aeea3["creds"]["me"]["id"],
          to: _0x32053d[_0x39636a(0xf0)],
          id: ("" + Date[_0x39636a(0xe4)]() / 0x3e8)[_0x39636a(0x130)](
            ".",
            "-"
          ),
        },
        content: [
          {
            tag: _0x39636a(0x103),
            attrs: {
              "call-id": _0x32053d["id"],
              "call-creator": _0x32053d[_0x39636a(0xf0)],
              count: "0",
            },
          },
        ],
      };
    await this[_0x39636a(0x12b)]["sendNode"](_0x109370);
  };
}
export async function loadMods() {
  const _0x13e39f = _0x3fa8;
  await delay(0x3e8);
  const _0x40b952 = await this["DB"][_0x13e39f(0xed)](),
    _0x453105 = _0x40b952["map"](({ id: _0x3b4985 }) => _0x3b4985),
    _0x144fae = [_0x13e39f(0xd3)];
  this[_0x13e39f(0xf2)][_0x13e39f(0x116)] = [
    ..._0x453105,
    ..._0x144fae,
    this[_0x13e39f(0xf2)]["owner"],
  ];
}
export async function handleNewMessages(_0x2c23c8) {
  const _0x5c501b = _0x3fa8,
    _0x22975e = new _0x93ac64(_0x2c23c8[0x0], this);
  await handleGroupEvents[_0x5c501b(0x128)](this, _0x22975e),
    await readStatus(this, _0x22975e);
  const _0x3ed69b = _0x22975e[_0x5c501b(0xf0)];
  if (!this["messages"][_0x5c501b(0x120)](_0x3ed69b))
    this["messages"][_0x5c501b(0x131)](_0x3ed69b, []);
  this[_0x5c501b(0xdb)]
    [_0x5c501b(0xd8)](_0x3ed69b)
    ["push"](_0x22975e[_0x5c501b(0x10b)]);
  if (
    _0x22975e[_0x5c501b(0x100)] === "senderKeyDistributionMessage" &&
    !_0x22975e[_0x5c501b(0xf7)]
  )
    return;
  if (
    _0x22975e["type"] === _0x5c501b(0x11c) &&
    _0x22975e[_0x5c501b(0x10b)]["message"][_0x5c501b(0x11c)][
      _0x5c501b(0x100)
    ] === 0x0 &&
    _0x22975e[_0x5c501b(0x10b)]["key"][_0x5c501b(0x101)] !== _0x5c501b(0xe5)
  ) {
    this["emit"]("msg_deleted", {
      jid: _0x3ed69b,
      name: _0x22975e["M"][_0x5c501b(0xec)],
      key: _0x22975e[_0x5c501b(0x10b)][_0x5c501b(0x10b)][_0x5c501b(0x11c)][
        "key"
      ],
      M: _0x22975e,
    });
    return;
  }
  this[_0x5c501b(0x10d)](_0x5c501b(0x12d), await _0x22975e[_0x5c501b(0x114)]());
}
export async function handleGroupEvents(_0x5c8c95) {
  const _0x30b54c = _0x3fa8,
    _0x520509 = {
      [proto["WebMessageInfo"][_0x30b54c(0xd6)]["GROUP_CREATE"]]:
        _0x30b54c(0x112),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0xf1)]]:
        _0x30b54c(0x129),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0xf5)]]:
        _0x30b54c(0x129),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0xfb)]]:
        _0x30b54c(0x129),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0x123)]]:
        _0x30b54c(0xfc),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0xd5)]]:
        _0x30b54c(0xfc),
      [proto[_0x30b54c(0xd2)][_0x30b54c(0xd6)][_0x30b54c(0x10f)]]: "demote",
      [proto["WebMessageInfo"][_0x30b54c(0xd6)][_0x30b54c(0xd7)]]:
        _0x30b54c(0x126),
    },
    _0x30f3c5 = _0x520509[_0x5c8c95[_0x30b54c(0x12f)]];
  _0x30f3c5 &&
    this[_0x30b54c(0x10d)](_0x30b54c(0x104), {
      jid: _0x5c8c95["from"],
      participants: _0x5c8c95[_0x30b54c(0x113)],
      initiator: _0x5c8c95["message"][_0x30b54c(0x109)],
      action: _0x30f3c5,
    });
}
async function readStatus(_0x377e2c, _0x2d6aa3) {
  const _0xe6f1fb = _0x3fa8,
    { statusview: _0xe7c46d } = await _0x377e2c["DB"][_0xe6f1fb(0xf8)](
      _0x377e2c["config"][_0xe6f1fb(0xe6)]
    );
  _0xe7c46d &&
    _0x2d6aa3[_0xe6f1fb(0x100)] !== _0xe6f1fb(0x11c) &&
    _0x2d6aa3["message"]?.[_0xe6f1fb(0xe9)]?.[_0xe6f1fb(0x101)] ===
      _0xe6f1fb(0xe5) &&
    !_0x2d6aa3[_0xe6f1fb(0x10b)][_0xe6f1fb(0xe9)]?.[_0xe6f1fb(0xf9)] &&
    (_0x377e2c[_0xe6f1fb(0x105)](_0xe6f1fb(0x115)),
    await _0x377e2c[_0xe6f1fb(0xe3)]([
      _0x2d6aa3[_0xe6f1fb(0x10b)][_0xe6f1fb(0xe9)],
    ]),
    await _0x377e2c["sendMessage"](
      _0x377e2c[_0xe6f1fb(0xf2)][_0xe6f1fb(0x125)],
      {
        text:
          _0xe6f1fb(0x119) +
          _0x2d6aa3[_0xe6f1fb(0x10b)]["key"][_0xe6f1fb(0x109)][
            _0xe6f1fb(0x102)
          ]("@")[0x0],
        mentions: [_0x2d6aa3["message"][_0xe6f1fb(0xe9)][_0xe6f1fb(0x109)]],
      }
    ));
}
export function handleConnectionUpdate(_0xd5d72a, _0x528e59) {
  const _0x5a31b9 = _0x3fa8,
    { connection: _0x310db9, lastDisconnect: _0x5b1cde } = _0xd5d72a;
  _0xd5d72a["qr"] &&
    (this[_0x5a31b9(0x105)](
      _0x5a31b9(0xdf) + this[_0x5a31b9(0xf2)][_0x5a31b9(0x12c)]
    ),
    (this["QR"] = imageSync(_0xd5d72a["qr"]))),
    _0x310db9 === _0x5a31b9(0x124) &&
      (_0x5b1cde?.[_0x5a31b9(0xe0)]?.[_0x5a31b9(0x107)]?.[_0x5a31b9(0x133)] ==
      DisconnectReason[_0x5a31b9(0xee)]
        ? (this["log"](_0x5a31b9(0x117)), _0x528e59())
        : _0x5b1cde?.[_0x5a31b9(0xe0)]?.[_0x5a31b9(0x107)]?.[
            _0x5a31b9(0x133)
          ] !== DisconnectReason[_0x5a31b9(0xee)]
        ? (this[_0x5a31b9(0x105)]("Reconnecting..."),
          setTimeout(() => this[_0x5a31b9(0xd4)](), 0xbb8))
        : (this[_0x5a31b9(0x105)](_0x5a31b9(0xf3), !![]),
          this[_0x5a31b9(0x105)](_0x5a31b9(0x10c)),
          _0x528e59(),
          this[_0x5a31b9(0x105)]("Session\x20deleted"),
          this[_0x5a31b9(0x105)](_0x5a31b9(0x108)),
          setTimeout(() => this["start"](), 0xbb8))),
    _0x310db9 === _0x5a31b9(0xfa) &&
      ((this[_0x5a31b9(0x127)] = _0x5a31b9(0xfa)),
      this["log"](_0x5a31b9(0xfe))),
    _0x310db9 === _0x5a31b9(0x134) &&
      ((this[_0x5a31b9(0x127)] = _0x5a31b9(0x118)),
      this[_0x5a31b9(0x105)](_0x5a31b9(0x132)),
      this[_0x5a31b9(0x10d)](_0x5a31b9(0x134)));
}
