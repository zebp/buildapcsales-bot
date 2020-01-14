import { Submission } from "../reddit";
import { RichEmbed } from "discord.js";
import findPriceForSubmission from "../price";

const defaultAvatar = "https://styles.redditmedia.com/t5_2s3dh/styles/communityIcon_bf4ya2rtdaz01.png";

export function createEmbeddedMessage(submission: Submission): RichEmbed {
    let embed = new RichEmbed()
        .setTitle(submission.title)
        .setColor("#FF4444")
        .setURL(submission.url)
        .setAuthor(`u/${submission.author} posted`, "https://i.kym-cdn.com/photos/images/newsfeed/000/919/691/9e0.png", "https://reddit.com" + submission.permalink)
        .setDescription(`A new post has appeared on [r/buildapcsales](https://reddit.com${submission.permalink}).`)
        .addField("Category", submission.link_flair_text, true)
        .addField("Price", findPriceForSubmission(submission) || "Unknown", true)
        .setTimestamp()
        .setFooter('r/buildapcsales', defaultAvatar);

    if (submission.thumbnail && submission.thumbnail !== "default") {
        embed = embed.setThumbnail(submission.thumbnail);
    }

    return embed;
}