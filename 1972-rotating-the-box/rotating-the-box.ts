function rotateTheBox(boxGrid: string[][]): string[][] {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    
    for (let i = 0; i < m; i++) {
        let empty = n - 1;

        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                empty = j - 1; 
            } else if (boxGrid[i][j] === '#') {
                
                [boxGrid[i][j], boxGrid[i][empty]] = [boxGrid[i][empty], boxGrid[i][j]];
                empty--;
            }
        }
    }

   
    const result: string[][] = Array.from({ length: n }, () => Array(m).fill('.'));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return result;
}