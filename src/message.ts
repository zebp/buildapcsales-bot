import { RichEmbed } from "discord.js";
import { Submission, RedditUser } from "snoowrap";
import axios from "axios";

const regexes = [
    /\s\$(\d+\.\d{2}?)\s/m,
    /\s(\d+\.\d{2}?)\s/m,
    /[\s=]\$(\d+[\.\d{2}]?)\s/m,
    /\s\$(\d+[\.\d{2}]?)\s?/m
];

const defaultAvatar = "https://styles.redditmedia.com/t5_2s3dh/styles/communityIcon_bf4ya2rtdaz01.png";

export async function createEmbeddedMessage(submission: Submission): Promise<RichEmbed> {
    let avatar = await provideAvatar(submission.author);

    return new RichEmbed()
        .setTitle(submission.title)
        .setColor("#FF4444")
        .setURL("https://reddit.com" + submission.permalink)
        .setAuthor(`u/${ submission.author.name } posted`, avatar, "https://reddit.com" + submission.permalink)
        .setDescription('A new post has appeared on [r/buildapcsales](https://www.reddit.com/r/buildapcsales/new/).')
        .addField("Price", findPrice(submission.title))
        .setTimestamp()
        .setFooter('r/buildapcsales', defaultAvatar);
}

export function findPrice(title: string): string {
    for (let regex of regexes) {
        let matches = regex.exec(title);

        if (matches !== null) {
            return "$" + matches[1];
        }
    }
    
    return "Unable to parse price";
}

export async function provideAvatar(author: RedditUser): Promise<string> {
    let body: any = await axios.get(`https://www.reddit.com/user/${ author.name }/about.json`);

    if (!author.icon_img) {
        return defaultAvatar;
    }

    return body.icon_img;
}