import SnooWrap from "snoowrap";
import { Client } from "discord.js";
import dotenv from "dotenv";
import { checkSubreddit } from "./reddit";
import { postSubmission } from "./discord";

const regions: { [key: string]: string; } = {
    "Canada": "bapcsalescanada"
};

dotenv.config();

const {
    REDDIT_ID, REDDIT_SECRET, REDDIT_USERNAME,
    REDDIT_PASSWORD, DISCORD_TOKEN, REGION
} = process.env || { REGION: "America" } as any;

const subReddit: string = regions[REGION!] || "buildapcsales";

const reddit = new SnooWrap({
    userAgent: "buildapcsales",
    clientId: REDDIT_ID,
    clientSecret: REDDIT_SECRET,
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD
});

const discord = new Client();
discord.login(DISCORD_TOKEN);

async function start() {
    try {
        let posts = await checkSubreddit(reddit, subReddit);
        posts.forEach(post => postSubmission(discord, post, subReddit, REGION!));
    } catch (error) {
        console.error(error)
    }

    setTimeout(start, 5000);
}

start();