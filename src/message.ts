import { RichEmbed } from "discord.js";
import { Submission } from "snoowrap";

const regexes = [
    /\s\$(\d+\.\d{2}?)\s/m,
    /\s(\d+\.\d{2}?)\s/m,
    /[\s=]\$(\d+[\.\d{2}]?)\s/m
];

export function createEmbeddedMessage(submission: Submission): RichEmbed {
    return new RichEmbed()
        .setTitle(submission.title)
        .setColor("#0099ff")
        .setURL("https://reddit.com" + submission.permalink)
        .setAuthor('Build a PC Sales', 'https://i.imgur.com/aKZ7byd.png', 'https://reddit.com/r/buildapcsales')
        .setDescription('A new post has appeared on r/buildapcsales')
        .addField("Price", findPrice(submission.title))
        .addField("Upvotes", submission.score)
        .addField("Author", submission.author.name)
        .setTimestamp()
        .setFooter('Build a PC Sales Discord Bot', 'https://i.imgur.com/aKZ7byd.png');
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