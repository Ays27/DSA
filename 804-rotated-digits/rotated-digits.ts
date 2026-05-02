function rotatedDigits(n: number): number {
    let count = 0;

    for (let i = 1; i <= n; i++) {
        let num = i;
        let isValid = true;
        let isChanged = false;

        while (num > 0) {
            const digit = num % 10;
            num = Math.floor(num / 10);

           
            if (digit === 3 || digit === 4 || digit === 7) {
                isValid = false;
                break;
            }

            
            if (digit === 2 || digit === 5 || digit === 6 || digit === 9) {
                isChanged = true;
            }
        }

        if (isValid && isChanged) {
            count++;
        }
    }

    return count;
}