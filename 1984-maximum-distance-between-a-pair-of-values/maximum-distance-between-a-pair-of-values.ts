function maxDistance(nums1: number[], nums2: number[]): number {
    let i = 0;
    let j = 0;
    let maxDist = 0;

    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            maxDist = Math.max(maxDist, j - i);
            j++; // try to extend distance
        } else {
            i++; // need smaller nums1[i]
        }
    }

    return maxDist;
}