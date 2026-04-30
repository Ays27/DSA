function maxPathScore(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;

    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array(k + 1).fill(-Infinity)
        )
    );

    const get = (val: number): [number, number] => {
        if (val === 0) return [0, 0];
        if (val === 1) return [1, 1];
        return [2, 1];
    };

    const [startScore, startCost] = get(grid[0][0]);
    if (startCost > k) return -1;
    dp[0][0][startCost] = startScore;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const [score, cost] = get(grid[i][j]);

            if (i === 0 && j === 0) continue;

            for (let c = k; c >= cost; c--) {
                let best = -Infinity;

                if (i > 0 && dp[i - 1][j][c - cost] !== -Infinity) {
                    best = Math.max(best, dp[i - 1][j][c - cost] + score);
                }

                if (j > 0 && dp[i][j - 1][c - cost] !== -Infinity) {
                    best = Math.max(best, dp[i][j - 1][c - cost] + score);
                }

                dp[i][j][c] = Math.max(dp[i][j][c], best);
            }
        }
    }

    const res = Math.max(...dp[m - 1][n - 1]);
    return res === -Infinity ? -1 : res;
}