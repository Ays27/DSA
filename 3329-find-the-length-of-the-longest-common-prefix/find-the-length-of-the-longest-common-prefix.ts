function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    let set = new Set<number>();

    for (let num of arr1) {
        while (num > 0) {
            set.add(num);
            num = Math.floor(num / 10);
        }
    }

    let maxLen = 0;

    
    for (let num of arr2) {
        let temp = num;

        while (temp > 0) {
            if (set.has(temp)) {
                maxLen = Math.max(maxLen, temp.toString().length);
            }
            temp = Math.floor(temp / 10);
        }
    }

    return maxLen;
}