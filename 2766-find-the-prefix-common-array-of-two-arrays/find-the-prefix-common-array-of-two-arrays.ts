function findThePrefixCommonArray(A: number[], B: number[]): number[] {
    const seenA = new Set<number>();
    const seenB = new Set<number>();
    const result: number[] = [];

    let common = 0;

    for (let i = 0; i < A.length; i++) {
        seenA.add(A[i]);
        seenB.add(B[i]);

        if (seenB.has(A[i])) {
            common++;
        }

        if (A[i] !== B[i] && seenA.has(B[i])) {
            common++;
        }

        result.push(common);
    }

    return result;
}