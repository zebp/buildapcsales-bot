import { Client, Snowflake, Guild, TextChannel, Message, Role } from "discord.js";
import { Submission } from "snoowrap";
import { createEmbeddedMessage} from "./message";
import { findChannel, findTypeFromSubmission } from "./channels";

export async function postSubmission(client: Client, submission: Submission, subReddit: string, region: string) {
    let guild: Guild = client.guilds.get(process.env.SERVER_ID as Snowflake)!;
    let channel: TextChannel = findChannel(guild, submission, region)! as TextChannel;

    if (!channel) {
        return;
    }

    await channel.send(await createEmbeddedMessage(submission, subReddit));
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

function findRole(channel: TextChannel, submission: Submission): Role | undefined {
    const type = findTypeFromSubmission(submission)!.toLowerCase();

    return channel.guild.roles
        .filter(role => role.name === type)
        .map(role => channel.guild.roles.get(role.id))[0];
}