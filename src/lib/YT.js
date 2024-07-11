import ytdl from '@distube/ytdl-core';
import { createWriteStream } from 'fs';
import { readFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import Utils from './utils.js';

export default class YT {
    constructor(url, type = 'video') {
        this.url = url;
        this.type = type;
        this.utils = new Utils();
    }

    validate = () => ytdl.validateURL(this.url);

    getInfo = async () => await ytdl.getInfo(this.url);

    download = async (quality = 'low') => {
        try {
            const downloadStream = async (url, options, filename) => {
                const stream = createWriteStream(filename);
                ytdl(url, options).pipe(stream);
                return new Promise((resolve, reject) => {
                    stream.on('finish', () => {
                        resolve(filename);
                    });
                    stream.on('error', (error) => {
                        console.error(`Stream error for ${filename}:`, error);
                        reject(error);
                    });
                });
            };

            if (this.type === 'audio' || quality === 'low') {
                const filename = `${tmpdir()}/${Math.random().toString(36).substring(2)}.${this.type === 'audio' ? 'mp3' : 'mp4'}`;
                await downloadStream(this.url, { quality: this.type === 'audio' ? 'highestaudio' : 'highest' }, filename);
                const buffer = await readFile(filename);
                await unlink(filename);
                return buffer;
            }

            const audioFilename = `${tmpdir()}/${Math.random().toString(36).substring(2)}.mp3`;
            const videoFilename = `${tmpdir()}/${Math.random().toString(36).substring(2)}.mp4`;
            await downloadStream(this.url, { quality: 'highestaudio' }, audioFilename);
            await downloadStream(this.url, { quality: quality === 'high' ? 'highestvideo' : 'lowestvideo' }, videoFilename);

            const outputFilename = `${tmpdir()}/${Math.random().toString(36).substring(2)}.mp4`;
            await this.utils.exec(`ffmpeg -i ${videoFilename} -i ${audioFilename} -c:v copy -c:a aac ${outputFilename}`);

            const buffer = await readFile(outputFilename);
            await Promise.all([unlink(videoFilename), unlink(audioFilename), unlink(outputFilename)]);
            return buffer;
        } catch (error) {
            console.error('Error during download:', error);
        }
    };

    getDownloadURL = async () => {
        try {
            const info = await ytdl.getInfo(this.url);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
            if (format) {
                return format.url;
            } else {
                throw new Error('No suitable format found');
            }
        } catch (error) {
            console.error('Error getting download URL:', error);
        }
    };
}
