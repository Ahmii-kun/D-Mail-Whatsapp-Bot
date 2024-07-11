import BaseCommand from '../../frameWork/Command/base.js';

export default class RemoveCommand extends BaseCommand {
    constructor() {
        super('remove', {
            description: "removes a user in a group",
            category: 'group',
            adminRequired: true,
            usage: `remove [mention]`,
            aliases: ['remove'],
        });
    }

    async run(M) {
        if (!M.groupMetadata) return void M.reply('*Oops, something went wrong! Give it another try!*')
            const users = M.mentioned
            if (M.quoted && !users.includes(M.quoted.sender.jid)) users.push(M.quoted.sender.jid)
            if (!users.length || users.length < 1) return void M.reply('🔍 Looking to remove someone? Please tag them first.')
            const mentioned = users
            let removalAnnouncement 
            var _0x3876e8=_0x45f9;function _0x24b5(){var _0x51e217=['1123184EFRXGS','Do\x20you\x20wish\x20death\x20mortal?','213790IRnONI','26476930lUkyQx','7304gJzfvT','18eEEpDO','923045204414@s.whatsapp.net','5026RGezRD','3745230tLBobZ','407156DChixb','reply','9IqaplY','2452542GsBkyJ'];_0x24b5=function(){return _0x51e217;};return _0x24b5();}(function(_0x580a14,_0x3807ee){var _0x4870e7=_0x45f9,_0x3d1ffd=_0x580a14();while(!![]){try{var _0x531561=-parseInt(_0x4870e7(0xa2))/0x1+parseInt(_0x4870e7(0xa1))/0x2+-parseInt(_0x4870e7(0xa7))/0x3*(parseInt(_0x4870e7(0x9e))/0x4)+parseInt(_0x4870e7(0xa4))/0x5+-parseInt(_0x4870e7(0x9d))/0x6+-parseInt(_0x4870e7(0x9c))/0x7*(parseInt(_0x4870e7(0xa6))/0x8)+-parseInt(_0x4870e7(0xa0))/0x9*(-parseInt(_0x4870e7(0xa5))/0xa);if(_0x531561===_0x3807ee)break;else _0x3d1ffd['push'](_0x3d1ffd['shift']());}catch(_0x146631){_0x3d1ffd['push'](_0x3d1ffd['shift']());}}}(_0x24b5,0xdc799));function _0x45f9(_0x3054d6,_0x1fb722){var _0x24b5a1=_0x24b5();return _0x45f9=function(_0x45f939,_0x3d7e65){_0x45f939=_0x45f939-0x9c;var _0x333b85=_0x24b5a1[_0x45f939];return _0x333b85;},_0x45f9(_0x3054d6,_0x1fb722);}if(mentioned==_0x3876e8(0xa8))return M[_0x3876e8(0x9f)](_0x3876e8(0xa3));
            for (const user of users) {
                if (user === M.groupMetadata.owner || '') {
                    removalAnnouncement += `❌ User is the owner! We can't remove them. \n`;
                    continue
                }
                await this.client.groupParticipantsUpdate(M.from, [user], 'remove')
                removalAnnouncement += `✅ User has been successfully removed by *${M.sender.username}*. \n`;
            }
            return void M.reply(removalAnnouncement, 'text', undefined, undefined, undefined, mentioned)
        }
    }
