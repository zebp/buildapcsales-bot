import dotenv from "dotenv";
import { Client } from "discord.js";
import DiscordBot from "./discord/bot";
import { getLatestSubmissions } from "./reddit";

async function main() {
    const { DISCORD_TOKEN } = process.env;

    const client = new Client();
    const bot = new DiscordBot(client);

    const visitedSubmissionSet = new Set<string>();

    await client.login(DISCORD_TOKEN);

    while (true) {
        const submissions = await getLatestSubmissions("buildapcsales", visitedSubmissionSet).catch(console.error); // TODO: Allow for a way to specify the subreddit.

        if (!submissions) {
            continue;
        }

        for (const submission of submissions) {
            await bot.sendSubmissionAlert(submission);
            visitedSubmissionSet.add(submission.id);
        }

        await new Promise((resolve, _) => setTimeout(resolve, 10_000)); // Sleep for 10 seconds to prevent rate limiting.
    }
}

dotenv.config();
main();
