function minimumHammingDistance(
    source: number[],
    target: number[],
    allowedSwaps: number[][]
): number {

    const n = source.length;

    const parent = Array.from({ length: n }, (_, i) => i);

    function find(x: number): number {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(a: number, b: number) {
        const rootA = find(a);
        const rootB = find(b);
        if (rootA !== rootB) {
            parent[rootB] = rootA;
        }
    }

    for (const [a, b] of allowedSwaps) {
        union(a, b);
    }

    const map = new Map<number, Map<number, number>>();

    for (let i = 0; i < n; i++) {
        const root = find(i);
        if (!map.has(root)) {
            map.set(root, new Map());
        }
        const freq = map.get(root)!;
        freq.set(source[i], (freq.get(source[i]) || 0) + 1);
    }

    
    let mismatch = 0;

    for (let i = 0; i < n; i++) {
        const root = find(i);
        const freq = map.get(root)!;

        if ((freq.get(target[i]) || 0) > 0) {
            freq.set(target[i], freq.get(target[i])! - 1);
        } else {
            mismatch++;
        }
    }

    return mismatch;
}