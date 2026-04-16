function solveQueries(nums: number[], queries: number[]): number[] {
    const n = nums.length;

    
    const positions = new Map<number, number[]>();

    for (let i = 0; i < n; i++) {
        if (!positions.has(nums[i])) {
            positions.set(nums[i], []);
        }
        positions.get(nums[i])!.push(i);
    }

    const ans = new Array<number>(n).fill(-1);

    const dist = (a: number, b: number): number => {
        const d = Math.abs(a - b);
        return Math.min(d, n - d); 
    };

    for (const [, idxs] of positions) {
        const k = idxs.length;

        if (k === 1) continue; 

        for (let i = 0; i < k; i++) {
            const cur = idxs[i];
            const prev = idxs[(i - 1 + k) % k];
            const next = idxs[(i + 1) % k];

            ans[cur] = Math.min(dist(cur, prev), dist(cur, next));
        }
    }

   
    return queries.map(q => ans[q]);
}