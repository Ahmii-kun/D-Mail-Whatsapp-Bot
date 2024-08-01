import ytdl from 'ytdl-core';
import qs from 'qs';
import axios from 'axios';

export default class YT {
    constructor(url, type = 'video') {
        this.url = url;
        this.type = type;
    }

    validate = () => ytdl.validateURL(this.url);

    getInfo = async () => await ytdl.getInfo(this.url);

    download = async (desiredQuality = 'auto') => {
        try {
          console.log(this.url);
          const form = {
            k_query: this.url,
            k_page: "home",
            hl: "en",
            q_auto: 0,
          };
          let response = await axios.post(
            "https://in-y2mate.com/mates/analyzeV2/ajax",
            qs.stringify(form),
          );

          let links = response.data.links.mp4;

          const qualityMapping = {
            high: '137',   // 1080p
            medium: '136', // 720p
            low: '135',    // 480p
          };

          let selectedLink = links[qualityMapping[desiredQuality]] || links.auto;

          if (!selectedLink) {
            throw new Error('Desired quality not available.');
          }

          let linkToken = selectedLink.k;
          let vid = response.data.vid;

          const res = await axios.post(
            "https://in-y2mate.com/mates/convertV2/index",
            qs.stringify({
              vid,
              k: linkToken,
            }),
          );

          let { data } = await axios.get(res.data.dlink, {
            responseType: "arraybuffer",
          });

          return data;
        } catch (error) {
          throw new Error(error);
        }
      }
}
