import axios from 'axios';
import { format, promisify } from 'util';
import { exec } from 'child_process';
import { uploadByBuffer } from 'telegraph-uploader';
import emojiRegex from 'emoji-regex';
import fs from 'fs';
import path from 'path';
import linkify from 'linkifyjs';
import { createCanvas, loadImage } from 'canvas';
import { spawn } from 'child_process';
import BodyForm from 'form-data'

export default class Utils {
    constructor() {
    }

    generateRandomHex = () => `#${(~~(Math.random() * (1 << 24))).toString(16)}`

    capitalize = (content) => `${content.charAt(0).toUpperCase()}${content.slice(1)}`

    generateRandomUniqueTag = (n = 4) => {
        let max = 11
        if (n > max) return `${this.generateRandomUniqueTag(max)}${this.generateRandomUniqueTag(n - max)}`
        max = Math.pow(10, n + 1)
        const min = max / 10
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString().substring(1)
    }

    generateRandomID() {
        const min = 10000;
        const max = 99999;
        const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomID;
    }

    extractNumbers = (content) => {
        const search = content.match(/(-\d+|\d+)/g)
        if (search !== null) return search.map((string) => parseInt(string))
        return []
    }

    extractUrls = (content) => {
        const urls = linkify.find(content)
        const arr = []
        for (const url of urls) {
            arr.push(url.value)
        }
        return arr
    }
    random = (mix) => Math.floor(Math.random() * mix)

    extractEmojis = (content) => content.match(emojiRegex()) || []

    formatSeconds = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)

    bufferToUrl = async (media) => (await uploadByBuffer(media)).link

    convertMs = (ms, to = 'seconds') => {
        const seconds = parseInt((ms / 1000).toString().split('.')[0])
        const minutes = parseInt((seconds / 60).toString().split('.')[0])
        const hours = parseInt((minutes / 60).toString().split('.')[0])
        if (to === 'hours') return hours
        if (to === 'minutes') return minutes
        return seconds
    }

    TelegraPh = async (Path) => {
        return new Promise(async (resolve, reject) => {
            if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
            try {
                const form = new BodyForm();
                form.append("file", fs.createReadStream(Path))
                const data = await axios({
                    url: "https://graph.org/upload",
                    method: "POST",
                    headers: {
                        ...form.getHeaders()
                    },
                    data: form
                })
                // console.log(data.data)
                return resolve("https://graph.org" + data.data[0].src)
            } catch (err) {
                return reject(new Error(String(err)))
            }
        })
    }

    createStickerCanvas = async (media, topCaption, bottomCaption) => {
        const img = await loadImage(media);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const topText = topCaption.trim();
        const bottomText = bottomCaption.trim();

        const maxFontSize = 0.2 * Math.min(canvas.width, canvas.height);
        const minFontSize = 0.1 * Math.min(canvas.width, canvas.height);

        const fontSize = Math.min(maxFontSize, minFontSize);
        ctx.font = `bold ${fontSize}px Montserrat`;

        // Top Caption
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        const topTextX = canvas.width / 2;
        const topTextY = fontSize;
        const topStrokeWidth = fontSize * 0.1;
        ctx.lineWidth = topStrokeWidth;
        ctx.strokeStyle = 'red';
        ctx.strokeText(topText, topTextX, topTextY);
        ctx.fillText(topText, topTextX, topTextY);

        // Bottom Caption
        ctx.textAlign = 'center';
        const bottomTextX = canvas.width / 2;
        const bottomTextY = canvas.height - fontSize * 0.5;
        const bottomStrokeWidth = fontSize * 0.1;
        ctx.lineWidth = bottomStrokeWidth;
        ctx.strokeStyle = 'red';
        ctx.strokeText(bottomText, bottomTextX, bottomTextY);
        ctx.fillText(bottomText, bottomTextX, bottomTextY);

        return canvas.toBuffer();
    };


    ffmpeg(buffer, args = [], ext = '', ext2 = '') {
        return new Promise(async (resolve, reject) => {
            try {
                let tmp = path.join(__dirname, '../bin', + new Date + '.' + ext)
                let out = tmp + '.' + ext2
                await fs.promises.writeFile(tmp, buffer)
                spawn('ffmpeg', [
                    '-y',
                    '-i', tmp,
                    ...args,
                    out
                ])
                    .on('error', reject)
                    .on('close', async (code) => {
                        try {
                            await fs.promises.unlink(tmp)
                            if (code !== 0) return reject(code)
                            resolve(await fs.promises.readFile(out))
                            await fs.promises.unlink(out)
                        } catch (e) {
                            reject(e)
                        }
                    })
            } catch (e) {
                reject(e)
            }
        })
    }

    fetch = async (url) => (await axios.get(url)).data
    
    sanitizeJid = (jid) => {
        const [a, b] = jid.split('@')
        return a.split(':').shift()?.concat('@', b) ?? jid
    }

    sanitizeJids = (jid) => {
        if (/:\d+@/gi.test(jid)) {
            const decoded = jidDecode(jid)
            if (decoded?.server && decoded.user) {
                return format('%s@%s', decoded.user, decoded.server)
            }
            return jid
        } else return jid
    }

    fetchBuffer = async (url) => (await axios.get(url, { responseType: 'arraybuffer' })).data

    getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    getRandomFile = (dir) => {
        let document = ''
        try {
            const result = readdirSync(dir)
            document = result[Math.floor(Math.random() * result.length)].split(/\.(?=[^\.]+$)/)[0]
        } catch {
            document = '404'
        }
        return document
    }

    generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    };

    getBuffer = async (url) =>
        (
            await axios.get(url, {
                responseType: 'arraybuffer'
            })
        ).data

    exec = promisify(exec)

    chunk = (arr, length) => {
        const result = []
        for (let i = 0; i < arr.length / length; i++) result.push(arr.slice(i * length, i * length + length))
        return result
    }

}
