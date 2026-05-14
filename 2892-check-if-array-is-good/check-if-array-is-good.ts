function isGood(nums: number[]): boolean {
    const m = nums.length;
    const n = m - 1;

    const freq = new Map<number, number>();

    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }

    //it  must have exactly n distinct possible values (1..n)
    for (let i = 1; i <= n; i++) {
        const count = freq.get(i) || 0;

        if (i === n) {
            if (count !== 2) return false;
        } else {
            if (count !== 1) return false;
        }
    }

    // to be sure no extra numbers exist
    if (freq.size !== n) return false;

    return true;
}