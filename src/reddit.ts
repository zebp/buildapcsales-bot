import Axios from "axios";
import { Url } from "url";

export type Thing<T> = {
    kind: string,
    data: T
}

export type Listing<T> = {
    modhash: string,
    before?: string,
    after?: string,
    children: T[]
}

export type Submission = {
    id: string,
    title: string,
    author: string,
    permalink: string,
    url: string,
    link_flair_text?: string,
    created_utc: number,
    thumbnail?: string,
}

const TIMEOUT = 60 * 60;

/**
 * Fetches the latests posts to the provided subreddit.
 * @param subreddit The subreddit to check for new posts.
 * @param visited A hash set containing all of the ids of previously visited posts.
 */
export async function getLatestSubmissions(subreddit: String, visited: Set<string>): Promise<Submission[]> {
    const response = await Axios.get(`https://reddit.com/r/${subreddit}/new.json`);
    const listing: Listing<Thing<Submission>> = response.data.data;

    const now = Date.now() / 1000;

    return listing
        .children
        .map(submission => submission.data)
        .filter(submission => (now - submission.created_utc) <= TIMEOUT)
        .filter(submission => !visited.has(submission.id));
}