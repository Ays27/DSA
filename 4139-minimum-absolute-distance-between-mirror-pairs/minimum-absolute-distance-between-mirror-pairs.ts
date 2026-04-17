function minMirrorPairDistance(nums: number[]): number {
    const seen = new Map<number, number>(); // stores: reversed value -> latest index
    let minDist = Infinity;

    const reverse = (x: number): number => {
        let rev = 0;
        while (x > 0) {
            rev = rev * 10 + (x % 10);
            x = Math.floor(x / 10);
        }
        return rev;
    };

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];

        // If current value matches some previous reversed number
        if (seen.has(val)) {
            const prevIndex = seen.get(val)!;
            minDist = Math.min(minDist, i - prevIndex);
        }

        // Store reverse of current number
        const rev = reverse(val);
        seen.set(rev, i);
    }

    return minDist === Infinity ? -1 : minDist;
}