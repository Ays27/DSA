function rotateGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;

    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        const vals: number[] = [];

        const top = layer;
        const left = layer;
        const bottom = m - 1 - layer;
        const right = n - 1 - layer;

        for (let j = left; j <= right; j++) {
            vals.push(grid[top][j]);
        }

        for (let i = top + 1; i <= bottom - 1; i++) {
            vals.push(grid[i][right]);
        }

        
        for (let j = right; j >= left; j--) {
            vals.push(grid[bottom][j]);
        }

       
        for (let i = bottom - 1; i >= top + 1; i--) {
            vals.push(grid[i][left]);
        }

        const len = vals.length;
        const shift = k % len;

      
        const rotated = vals.slice(shift).concat(vals.slice(0, shift));

        let idx = 0;

       
        for (let j = left; j <= right; j++) {
            grid[top][j] = rotated[idx++];
        }

      
        for (let i = top + 1; i <= bottom - 1; i++) {
            grid[i][right] = rotated[idx++];
        }

       
        for (let j = right; j >= left; j--) {
            grid[bottom][j] = rotated[idx++];
        }

       
        for (let i = bottom - 1; i >= top + 1; i--) {
            grid[i][left] = rotated[idx++];
        }
    }

    return grid;
}