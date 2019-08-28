import { Guild, GuildChannel } from "discord.js";
import { Submission } from "snoowrap";

const categoryAliases: { [key: string]: string; } = {
    "m.2 ssd": "ssd"
};

export function findChannel(guild: Guild, submission: Submission, region: string): GuildChannel | undefined {
    const itemType = findTypeFromSubmission(submission);

    if (!itemType) {
        return undefined;
    }

    let type = itemType.toLowerCase();
    let channel = findChannelByName(guild, type, region);

    if (!channel) {
        if (categoryAliases[type]) {
            return findChannelByName(guild, categoryAliases[type], region);
        } else {
            return findChannelByName(guild, "other", region);
        }
    }
    
    return channel;
}

function findChannelByName(guild: Guild, itemCategory: string, region: string): GuildChannel | undefined {
    const categoryName = `build a pc sales ${region}`.toLowerCase();

    return guild.channels
        .filter(channel => channel.parent !== null)
        .filter(channel => channel.parent.name.toLowerCase() === categoryName)
        .filter(channel => channel.name === itemCategory)
        .map(channel => guild.channels.get(channel.id))[0];
}

export function findTypeFromSubmission(submission: Submission): string | undefined {
    if (submission.link_flair_text) {
        return submission.link_flair_text;
    }

    const matches = /\[(.+)\].+/gm.exec(submission.title);

    if (matches === null) {
        return undefined;
    }

    return matches[1];
}