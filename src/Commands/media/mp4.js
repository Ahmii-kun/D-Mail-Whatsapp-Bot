import BaseCommand from '../../frameWork/Command/base.js';
import axios  from 'axios'
import YT  from '../..//lib/YT.js'


export default class MP4 extends BaseCommand {
    constructor() {
        super('mp4', {
            description: 'Downloads and sends the video of the provided video link',
            category: 'media',
            usage: 'mp4 [link]',
            aliases: ['ytvideo', 'ytv', 'video', 'fb', 'insta', 'facebook','instagram', ]
        });
    }

    async run(M, { context, flags }) {
        if (!M.urls.length) return M.reply('Please provide a TikTok or YouTube URL');
const [url] = M.urls;

try {
    if (url.includes('tiktok.com')) {
        M.reply("*Please wait, video is being downloaded...*");
        const res = await axios.get(`${this.client.config.API_URL}tiktok?url=${url}`);
        let videoURL = res.data.videoData.downloadLinks[2];
        const quality = flags.find(f => f.startsWith('--quality=') && ['720', 'low', 'high', '1080'].includes(f.split('=')[1]))?.split('=')[1] || '1080';
        if (quality === '720' || quality === 'low') videoURL = res.data.videoData.downloadLinks[1];
        
        const headRes = await axios.get(videoURL.link, { headers: { 'Range': 'bytes=0-0' } });
        const videoSizeMB = (headRes.headers['content-range'].split('/')[1] / (1024 * 1024)).toFixed(2);
        if (videoSizeMB > 100) return M.reply(`The video size is *${videoSizeMB} MB*, which is too large to download.`);
        
        const buffer = await this.client.utils.getBuffer(videoURL.link);
        return M.reply(buffer, 'video', undefined, undefined, res.data.videoData.title);
    }

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        try {
            const { validate, download, getInfo } = new YT(url);
            if (!validate()) return M.reply('Provide a valid YouTube video URL, Baka!');
            
            const quality = flags.find(f => f.startsWith('--quality=') && ['low', 'medium', 'high'].includes(f.split('=')[1]))?.split('=')[1] || 'medium';
            const { videoDetails } = await getInfo();
            if (Number(videoDetails.lengthSeconds) > 1800) return M.reply('The video is too long, it will take some time to download.');
            
            const video = await download(quality);
            const text = `🎬 *Title: ${videoDetails.title}* 📺 *Channel: ${videoDetails.author.name}* ⏱️ *Duration: ${videoDetails.lengthSeconds}s*`;
            return M.reply(video, 'video', undefined, undefined, text).catch(async () => {
                M.reply("Sending the video as Document as the video's too big");
                setTimeout(async () => {
                    await M.reply(await this.client.utils.getBuffer(videoDetails.thumbnails[0].url), 'image', undefined, undefined, text);
                    await M.reply(video, 'document', undefined, 'video/mp4', undefined, undefined, undefined, await this.client.utils.getBuffer(videoDetails.thumbnails[0].url), `${videoDetails.title}.mp4`);
                }, 3000);
            });
        } catch (e) {
            console.log(e)
        }
    }

    if (url.includes('instagram.com/')) {
        const text = context || M.quoted.content;
        M.reply("*Please wait, video or image is being downloaded...*");
        const res = await axios.get(`${this.client.config.API_URL}insta?url=${text}`);
        const buffer = await this.client.utils.getBuffer(res.data.data[0].url);
        const type = res.data.data[0].url.startsWith('https://scontent') ? 'image' : 'video';
        return M.reply(buffer, type, undefined, undefined, `Downloaded by: ${this.client.config.name}`);
    }

    if (url.includes('facebook.com/')) {
        const text = context || M.quoted.content;
        M.reply("*Please wait, video is being downloaded...*");
        const res = await axios.get(`${this.client.config.API_URL}facebook?url=${text}`);
        const buffer = await this.client.utils.getBuffer(res.data);
        return M.reply(buffer, 'video', undefined, undefined, `Downloaded by: ${this.client.config.name}`);
    }
    return M.reply('❌ Wrong URL! Only TikTok, YouTube, Instagram, and Facebook videos can be downloaded.');
} catch (error) {
    console.error(error);
    M.reply("Sorry, there was an error processing the content.");
}

    }
}


