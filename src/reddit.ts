import Axios from "axios";
import { Url } from "url";

export type Thing<T> = {
    kind: string,
    data: T
}

export type Listing<T> = {
    modhash: string,
    before: string | undefined,
    after: string | undefined,
    children: T[]
}

export type Submission = {
    id: string,
    title: String,
    url: Url,
    link_flair_text: string | undefined,
    thumbnail: Url | string,
}

/**
 * Fetches the latests posts to the provided subreddit.
 * @param subreddit The subreddit to check for new posts.
 * @param visited A hash set containing all of the ids of previously visited posts.
 */
export async function getLatestSubmissions(subreddit: String, visited: Set<string>): Promise<Submission[]> {
    const response = await Axios.get(`https://reddit.com/r/${subreddit}/new.json`);
    const listing: Listing<Submission> = response.data.data;

    return listing
        .children
        .filter(submission => !visited.has(submission.id));
}