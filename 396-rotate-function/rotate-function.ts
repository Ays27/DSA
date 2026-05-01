function maxRotateFunction(nums: number[]): number {
    const n = nums.length;
    
    let sum = 0;
    let F = 0;

  
    for (let i = 0; i < n; i++) {
        sum += nums[i];
        F += i * nums[i];
    }

    let maxVal = F;

    
    for (let k = 1; k < n; k++) {
        F = F + sum - n * nums[n - k];
        maxVal = Math.max(maxVal, F);
    }

    return maxVal;
}