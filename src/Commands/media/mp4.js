import BaseCommand from '../../frameWork/Command/base.js';
import axios  from 'axios'
import YT  from '../../lib/YT'


export default class MP4 extends BaseCommand {
    constructor() {
        super('mp4', {
            description: 'Downloads and sends the video of the provided video link',
            cooldown: 10,
            category: 'media',
            exp: 25,
            usage: 'mp4 [link]',
            limit: 6,
            aliases: ['ytvideo', 'ytv', 'video', 'fb', 'insta', 'facebook','instagram', ]
        });
    }

    async run(M, { context, flags }) {
        const { urls } = M;
        if (!urls.length) {
            return M.reply('Please provide a TikTok or YouTube URL');
        }
    
        const [url] = urls;

        const getQualityFlag = (availableQualities) => {
            const qualityFlag = flags.find(flag => flag.startsWith('--quality='));
            if (qualityFlag) {
                const quality = qualityFlag.split('=')[1].toLowerCase();
                if (availableQualities.includes(quality)) {
                    return quality;
                }
            }
            return availableQualities[0];
        };
    
        // TikTok video download handler
        const handleTikTok = async () => {
            try {
                M.reply("*Please wait, video is being downloaded...*");
                const res = await axios.get(`${this.client.config.API_URL}tiktok?url=${url}`);
                let scrappedURL = res.data.videoData.downloadLinks[2];
                const qualities = ['1080', '720', 'low', 'high'];
                const quality = getQualityFlag(qualities);
    
                if (quality === '720' || quality === 'low') {
                    scrappedURL = res.data.videoData.downloadLinks[1];
                }
    
                const headRes = await axios.get(scrappedURL.link, {
                    headers: { 'Range': 'bytes=0-0' }
                });
    
                const contentLength = headRes.headers['content-range'].split('/')[1];
                const videoSizeMB = (contentLength / (1024 * 1024)).toFixed(2);
    
                if (videoSizeMB > 125) {
                    await M.reply(`The video size is *${videoSizeMB} MB*, which is too large to download\n\nDownloading in 720p now.`);
                    scrappedURL = res.data.videoData.downloadLinks[1];
                }
    
                const buffer = await this.client.utils.getBuffer(scrappedURL.link);
                const texT = res.data.videoData.title;
                return M.reply(buffer, 'video', undefined, undefined, texT);
            } catch (error) {
                console.error('TikTok download error:', error);
                return M.reply('Failed to download TikTok video.');
            }
        };
    
        // YouTube video download handler
        const handleYouTube = async () => {
            try {
                const { validate, download, getInfo } = new YT(url);
                if (!validate()) {
                    return M.reply('Provide a valid YouTube video URL, Baka!');
                }
    
                const qualities = ['low', 'medium', 'high'];
                const quality = getQualityFlag(qualities);
                const { videoDetails } = await getInfo();
    
                if (Number(videoDetails.lengthSeconds) > 1800) {
                    await M.reply('The video is too long, it will take some time to download.');
                }
    
                const video = await download(quality);
                const text = `🎬 *Title: ${videoDetails.title}* 📺 *Channel: ${videoDetails.author.name}* ⏱️ *Duration: ${videoDetails.lengthSeconds}s*`;
    
                return M.reply(video, 'video', undefined, undefined, text).catch(async () => {
                    await M.reply("Sending the video as Document as the video's too big");
                    setTimeout(async () => {
                        await M.reply(
                            await this.client.utils.getBuffer(videoDetails.thumbnails[0].url),
                            'image',
                            undefined,
                            undefined,
                            text
                        );
                        return M.reply(
                            video,
                            'document',
                            undefined,
                            'video/mp4',
                            undefined,
                            undefined,
                            undefined,
                            await this.client.utils.getBuffer(videoDetails.thumbnails[0].url),
                            `${videoDetails.title}.mp4`
                        );
                    }, 3000);
                });
            } catch (error) {
                console.error('YouTube download error:', error);
                return M.reply('Failed to download YouTube video.');
            }
        };
    
        // Instagram video or image download handler
        const handleInstagram = async () => {
            try {
                const text = context || M.quoted.content;
                M.reply("*Please wait, video or image is being downloaded...*");
                const res = await axios.get(`${this.client.config.API_URL}insta?url=${text}`);
                const scrappedURL = res.data.data[0].url;
                const buffer = await this.client.utils.getBuffer(scrappedURL);
                const texT = `Downloaded by: ${this.client.config.name}`;
    
                if (scrappedURL.startsWith('https://scontent')) {
                    return M.reply(buffer, 'image', undefined, undefined, texT);
                } else {
                    return M.reply(buffer, 'video', undefined, undefined, texT);
                }
            } catch (error) {
                console.error("Instagram download error:", error);
                return M.reply("Sorry, there was an error processing the content.");
            }
        };
    
        // Facebook video download handler
        const handleFacebook = async () => {
            try {
                const text = context || M.quoted.content;
                M.reply("*Please wait, video is being downloaded...*");
                const res = await axios.get(`${this.client.config.API_URL}facebook?url=${text}`);
                const scrappedURL = res.data;
                const buffer = await this.client.utils.getBuffer(scrappedURL);
                const texT = `Downloaded by: ${this.client.config.name}`;
                try {
                    await this.client.sendMessage(M.from, { video: buffer, caption:texT })
                } catch (e) {
                    this.client.log(e.message, true)
                }
                // return M.reply(buffer, 'video', undefined, undefined, texT);
            } catch (error) {
                console.error('Facebook download error:', error);
                return M.reply("Video is private, can't be downloaded.");
            }
        };
    
        // URL handlers
        if (url.includes('tiktok.com')) {
            return handleTikTok();
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return handleYouTube();
        } else if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('instagram.com/stories/') || url.includes('instagram.com/tv/')) {
            return handleInstagram();
        } else if (url.includes('facebook.com/') || url.includes('facebook.com/reel/') || url.includes('fb.watch/') || url.includes('facebook.com/tv/')) {
            return handleFacebook();
        } else {
            return M.reply('❌ Wrong URL! Only TikTok, YouTube, Instagram, Facebook, and Twitter videos can be downloaded.');
        }
    }
}


