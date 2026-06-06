function leftRightDifference(nums: number[]): number[] {
    const n = nums.length;
    const ans: number[] = new Array(n);

    let total = nums.reduce((sum, num) => sum + num, 0);
    let leftSum = 0;

    for (let i = 0; i < n; i++) {
        total -= nums[i]; 
        ans[i] = Math.abs(leftSum - total);
        leftSum += nums[i];
    }

    return ans;
}