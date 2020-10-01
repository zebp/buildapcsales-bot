import { Submission } from "./reddit";

// Regexes used to detect the price in the title of a submission.
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
