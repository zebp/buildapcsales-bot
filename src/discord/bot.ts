import { Client, MessageReaction, User, Message, RichEmbed, TextChannel } from "discord.js";
import { Submission } from "../reddit";
import createDiscordChannels from "./setup";
import { getRoleByName } from "./role";
import { getCategoryForTitle } from "../categories";
import { createEmbeddedMessage } from "./message";

export default class DiscordBot {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.client.on("message", this.onMessage);
    }

    async onMessage(message: Message) {
        if (message.content === "!setup") { // TODO: Setup permissions for initial bot setup.
            const member = await message.guild.fetchMember(message.author);

            if (!member.hasPermission("ADMINISTRATOR", false, true)) {
                return;
            }
 
            // TODO: Set up channels and stuff.
            await createDiscordChannels(this.client, message.guild);
        } else if (message.content.startsWith("!subscribe ")) {
            await message.delete();

            const matches = message.content.match(/\!subscribe\s(.+)/);
            const argument = matches![1];

            const role = getRoleByName(argument, message.guild);

            if (!role || role.hasPermission("ADMINISTRATOR", false, true)) {
                const embed = new RichEmbed()
                    .setTitle("Invalid Category")
                    .setDescription("We cannot subscribe you to that invalid category.")
                    .setColor("#36b6e0")
                    .setTimestamp();

                await message.author.send(embed);
                return;
            }

            const member = await message.guild.fetchMember(message.author);

            if (member.roles.find(memberRole => memberRole.id === role.id)) {
                await member.removeRole(role);
            } else {
                await member.addRole(role);
            }
        }
    }

    /**
     * Sends a notification to a Discord channel letting users know that
     * there is a new item that is on sale.
     * 
     * @param submission The submission to notify the users about.
     */
    async sendSubmissionAlert(submission: Submission) {
        const guild = this.client.guilds.get(process.env.GUILD_ID as string)!;
        const category = getCategoryForTitle(submission);

        const channel = guild.channels
            .find(c => c.name === category.toLowerCase()) as TextChannel;

        const message = createEmbeddedMessage(submission);
        await channel.send(message);
    }

}