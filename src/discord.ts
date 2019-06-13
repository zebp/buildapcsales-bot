import { Client, Snowflake, Guild, GuildChannel, TextChannel, Message, Channel, Role } from "discord.js";
import { Submission } from "snoowrap";
import { createEmbeddedMessage} from "./message";

export async function postSubmission(client: Client, submission: Submission) {
    let guild: Guild = client.guilds.get(process.env.SERVER_ID as Snowflake)!;
    let channel: TextChannel = findChannel(guild, submission)! as TextChannel;

    if (!channel) {
        return;
    }

    await channel.send(createEmbeddedMessage(submission));
    notifyUsers(channel, submission);
}

function findChannel(guild: Guild, submission: Submission): GuildChannel | undefined {
    let flair = submission.link_flair_text!.toLowerCase();

    return guild.channels
        .filter(channel => channel.name === flair)
        .map(channel => guild.channels.get(channel.id))[0];
}

async function notifyUsers(channel: TextChannel, submission: Submission) {
    let role = findRole(channel, submission)!;
    let message: Message | Message[] = await channel.send(`${ role }`);
    
    if (Array.isArray(message)) {
        (message as Message[]).forEach(message => message.delete());
    } else {
        (message as Message).delete();
    }
}

function findRole(channel: TextChannel, submission: Submission): Role | undefined{
    let flair = submission.link_flair_text!.toLowerCase();

    return channel.guild.roles
        .filter(role => role.name === flair)
        .map(role => channel.guild.roles.get(role.id))[0];
}