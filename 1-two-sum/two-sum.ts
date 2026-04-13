function twoSum(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diffe = target - num;
    if (map.has(diffe)) {
      const secondIndex = map.get(diffe);
      return [i, secondIndex];
    }

    map.set(num, i);
  }

 
  return [0, 1];
};