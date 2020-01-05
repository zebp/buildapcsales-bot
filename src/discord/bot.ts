import { Client, MessageReaction, User, Message, RichEmbed } from "discord.js";
import { Submission } from "../reddit";
import createDiscordChannels from "./setup";
import { getRoleByName } from "./role";

export default class DiscordBot {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.client.on("messageReactionAdd", this.onReactionAdd);
        this.client.on("messageReactionRemove", this.onReactionAdd);
        this.client.on("message", this.onMessage);
    }

    // Handles registering users to a category by adding a reaction to
    // an emoji that signifies a category.
    onReactionAdd(messageReaction: MessageReaction, user: User) {

    }

    onReactionRemove(messageReaction: MessageReaction, user: User) {

    }

    async onMessage(message: Message) {
        if (message.content === "!setup") { // TODO: Setup permissions for initial bot setup.
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

                await message.author.sendEmbed(embed);
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
    sendSubmissionAlert(submission: Submission) {

    }

}