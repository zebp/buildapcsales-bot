import { Submission } from "./reddit";

// TODO: Refactor this giant hacky mess into something that isn't terrible.
const REGEXES = [
    /\$((?:\d|\,)*\.?\d+)/m,
    /\s\$(\d+\.\d{2}?)\s/m,
    /\s(\d+\.\d{2}?)\s/m,
    /[\s=]\$(\d+[\.\d{2}]?)\s/m,
    /\s\$(\d+[\.\d{2}]?)\s?/m
];

export default function findPriceForSubmission(submission: Submission): string | undefined {
    for (let regex of REGEXES) {
        let matches = regex.exec(submission.title);

        if (matches !== null) {
            return "$" + matches[1];
        }
    }
}