import { Client, MessageReaction, User, Message } from "discord.js";
import { Submission } from "../reddit";
import createDiscordChannels from "./setup";

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