function minOperations(grid: number[][], x: number): number {
    const arr: number[] = [];
    
  
    for (let row of grid) {
        for (let num of row) {
            arr.push(num);
        }
    }

    
    const mod = arr[0] % x;
    for (let num of arr) {
        if (num % x !== mod) {
            return -1;
        }
    }

    
    arr.sort((a, b) => a - b);

   
    const median = arr[Math.floor(arr.length / 2)];

   
    let operations = 0;
    for (let num of arr) {
        operations += Math.abs(num - median) / x;
    }

    return operations;
}