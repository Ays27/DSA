function hasValidPath(grid: number[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    const dirs: Record<number, number[]> = {
        1: [1, 3],
        2: [0, 2],
        3: [3, 2],
        4: [1, 2],
        5: [0, 3],
        6: [0, 1],
    };

    const moves = [
        [-1, 0], 
        [0, 1],  
        [1, 0],  
        [0, -1], 
    ];

    const opposite = [2, 3, 0, 1];

    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const queue: [number, number][] = [[0, 0]];
    visited[0][0] = true;

    while (queue.length) {
        const [x, y] = queue.shift()!;

        if (x === m - 1 && y === n - 1) return true;

        const type = grid[x][y];

        for (const d of dirs[type]) {
            const nx = x + moves[d][0];
            const ny = y + moves[d][1];

            if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue;
            if (visited[nx][ny]) continue;

            const nextType = grid[nx][ny];

            if (dirs[nextType].includes(opposite[d])) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }

    return false;
}