function distance(nums: number[]): number[] {
    const n = nums.length;
    const res = new Array(n).fill(0);

    const map = new Map<number, number[]>();

    for (let i = 0; i < n; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], []);
        }
        map.get(nums[i])!.push(i);
    }

   
    for (const positions of map.values()) {
        const m = positions.length;

      
        const prefix = new Array(m + 1).fill(0);
        for (let i = 0; i < m; i++) {
            prefix[i + 1] = prefix[i] + positions[i];
        }

        for (let i = 0; i < m; i++) {
            const pos = positions[i];

            
            const leftSum = prefix[i];
            const leftCount = i;
            const left = pos * leftCount - leftSum;

            
            const rightSum = prefix[m] - prefix[i + 1];
            const rightCount = m - i - 1;
            const right = rightSum - pos * rightCount;

            res[pos] = left + right;
        }
    }

    return res;
}