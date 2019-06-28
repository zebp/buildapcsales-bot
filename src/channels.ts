import { Guild, GuildChannel } from "discord.js";
import { Submission } from "snoowrap";

const categoryAliases: { [key: string]: string; } = {
    "m.2 ssd": "ssd"
};

export function findChannel(guild: Guild, submission: Submission): GuildChannel | undefined {
    if (!submission.link_flair_text) {
        return undefined;
    }

    let flair = submission.link_flair_text!.toLowerCase();
    let channel = findChannelByName(guild, flair);

    if (!channel) {
        if (categoryAliases[flair]) {
            return findChannelByName(guild, categoryAliases[flair]);
        } else {
            return findChannelByName(guild, "other");
        }
    }
    
    return channel;
}

function findChannelByName(guild: Guild, category: string): GuildChannel | undefined {
    return guild.channels
        .filter(channel => channel.name === category)
        .map(channel => guild.channels.get(channel.id))[0];
}
