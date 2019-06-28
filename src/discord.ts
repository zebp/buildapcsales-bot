import { Client, Snowflake, Guild, TextChannel, Message, Role } from "discord.js";
import { Submission } from "snoowrap";
import { createEmbeddedMessage} from "./message";
import { findChannel } from "./channels";

export async function postSubmission(client: Client, submission: Submission) {
    let guild: Guild = client.guilds.get(process.env.SERVER_ID as Snowflake)!;
    let channel: TextChannel = findChannel(guild, submission)! as TextChannel;

    await channel.send(await createEmbeddedMessage(submission));
    notifyUsers(channel, submission);
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