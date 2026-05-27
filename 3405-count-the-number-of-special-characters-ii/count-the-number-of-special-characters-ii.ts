function numberOfSpecialChars(word: string): number {
    let lastLower = new Map<string, number>();
    let firstUpper = new Map<string, number>();

    for (let i = 0; i < word.length; i++) {
        let ch = word[i];

        if (ch >= 'a' && ch <= 'z') {
            lastLower.set(ch, i);
        } else {
            let lower = ch.toLowerCase();
            if (!firstUpper.has(lower)) {
                firstUpper.set(lower, i);
            }
        }
    }

    let count = 0;

    for (let [ch, lowerPos] of lastLower) {
        if (
            firstUpper.has(ch) &&
            lowerPos < firstUpper.get(ch)!
        ) {
            count++;
        }
    }

    return count;
}