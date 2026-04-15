function sortedSquares(nums: number[]): number[] {
    return nums.map(value => value*value).sort((a,b)=>a-b)
    
};