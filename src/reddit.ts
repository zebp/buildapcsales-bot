import Snoowrap, { Submission } from 'snoowrap';

// A list of strings that represents the id's of submissions that have already been scraped.
let alreadyFound: string[] = [];

const timeout = 10 * 60;

export async function checkSubreddit(app: Snoowrap): Promise<Submission[]> {
    let now = Math.floor(new Date().getTime() / 1000);
    let listing = await app.getSubreddit("buildapcsales").getNew();

    let posts: Submission[] = listing
        .filter(post => (now - post.created_utc) <= timeout)
        .filter(post => !alreadyFound.includes(post.id));
    posts.forEach(post => alreadyFound.push(post.id));

    return posts;
}