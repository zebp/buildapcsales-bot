import SnooWrap from "snoowrap";
import { Client } from "discord.js";
import dotenv from "dotenv";
import { checkSubreddit } from "./reddit";
import { postSubmission } from "./discord";

dotenv.config();

const {
    REDDIT_ID, REDDIT_SECRET, REDDIT_USERNAME,
    REDDIT_PASSWORD, DISCORD_TOKEN
} = process.env;

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
    let posts = await checkSubreddit(reddit);
    posts.forEach(post => postSubmission(discord, post));

    setTimeout(start, 5000);
}

start();