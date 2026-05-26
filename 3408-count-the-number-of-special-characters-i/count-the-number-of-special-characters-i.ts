function numberOfSpecialChars(word: string): number {
    let lower = new Set<string>();
    let upper = new Set<string>();

    for (let ch of word) {
        if (ch >= 'a' && ch <= 'z') {
            lower.add(ch);
        } else {
            upper.add(ch);
        }
    }

    let count = 0;

    for (let ch of lower) {
        if (upper.has(ch.toUpperCase())) {
            count++;
        }
    }

    return count;
}