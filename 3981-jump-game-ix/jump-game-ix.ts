function maxValue(nums: number[]): number[] {
    const n = nums.length;

    const ans: number[] = Array(n);

    // preMax[i] = maximum in nums[0..i]
    const preMax: number[] = Array(n);
    preMax[0] = nums[0];

    for (let i = 1; i < n; i++) {
        preMax[i] = Math.max(preMax[i - 1], nums[i]);
    }

    let sufMin = Infinity;

    // traverse from right to left
    for (let i = n - 1; i >= 0; i--) {

        // if there exists a smaller value on the right,
        // then i can connect to the same component as i+1
        if (preMax[i] > sufMin && i < n - 1) {
            ans[i] = ans[i + 1];
        } else {
            ans[i] = preMax[i];
        }

        sufMin = Math.min(sufMin, nums[i]);
    }

    return ans;
}