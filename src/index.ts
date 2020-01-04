import dotenv from "dotenv";
import { Client } from "discord.js";
import DiscordBot from "./discord/bot";

async function main() {
    const { DISCORD_TOKEN } = process.env;
    console.log(DISCORD_TOKEN);

    const client = new Client();
    const bot = new DiscordBot(client);

    await client.login(DISCORD_TOKEN);
}

dotenv.config();
main();