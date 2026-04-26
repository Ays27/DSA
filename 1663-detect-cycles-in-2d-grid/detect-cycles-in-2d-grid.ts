function containsCycle(grid: string[][]): boolean {
    const m = grid.length;
    const n = grid[0].length;

    const visited: boolean[][] = Array.from({ length: m }, () =>
        Array(n).fill(false)
    );

    const directions = [
        [0, 1],   
        [1, 0],   
        [0, -1],  
        [-1, 0]   
    ];

    function dfs(r: number, c: number, pr: number, pc: number, char: string): boolean {
        if (visited[r][c]) return true;

        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < m &&
                nc >= 0 && nc < n &&
                grid[nr][nc] === char
            ) {
                
                if (nr === pr && nc === pc) continue;

                if (dfs(nr, nc, r, c, char)) {
                    return true;
                }
            }
        }

        return false;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (!visited[i][j]) {
                if (dfs(i, j, -1, -1, grid[i][j])) {
                    return true;
                }
            }
        }
    }

    return false;
}