function maximumScore(grid: number[][]): number {
    const n: number = grid.length;

    
    const prefix: number[][] = Array.from({ length: n }, () =>
        new Array(n + 1).fill(0)
    );

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            prefix[j][i + 1] = prefix[j][i] + grid[i][j];
        }
    }

    let prevPick: number[] = new Array(n + 1).fill(0);
    let prevSkip: number[] = new Array(n + 1).fill(0);

    for (let j = 1; j < n; j++) {
        const currPick: number[] = new Array(n + 1).fill(0);
        const currSkip: number[] = new Array(n + 1).fill(0);

        for (let curr = 0; curr <= n; curr++) {
            for (let prev = 0; prev <= n; prev++) {

                if (curr > prev) {
                    const score =
                        prefix[j - 1][curr] - prefix[j - 1][prev];

                    currPick[curr] = Math.max(
                        currPick[curr],
                        prevSkip[prev] + score
                    );

                    currSkip[curr] = Math.max(
                        currSkip[curr],
                        prevSkip[prev] + score
                    );

                } else {
                    const score =
                        prefix[j][prev] - prefix[j][curr];

                    currPick[curr] = Math.max(
                        currPick[curr],
                        prevPick[prev] + score
                    );

                    currSkip[curr] = Math.max(
                        currSkip[curr],
                        prevPick[prev]
                    );
                }
            }
        }

        prevPick = currPick;
        prevSkip = currSkip;
    }

    return Math.max(...prevPick);
}