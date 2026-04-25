function maxDistance(side: number, points: number[][], k: number): number {
    const n = points.length;
    const perimeter = 4 * side;

    // Map boundary points to perimeter index
    function toIndex([x, y]: number[]): number {
        if (y === 0) return x; // bottom edge
        if (y === side) return 2 * side + (side - x); // top edge
        if (x === 0) return 3 * side + (side - y); // left edge
        return side + y; // right edge
    }

    const indices = points.map(toIndex).sort((a, b) => a - b);

    // Binary search helper: find smallest index >= target
    function bisectLeft(arr: number[], target: number): number {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    // Check if we can pick k points with min spacing >= mn
    function check(mn: number): boolean {
        for (let i = 0; i < n; i++) {
            let count = 1;
            let curr = i;
            while (count < k) {
                const jump = bisectLeft(indices, indices[curr] + mn);
                if (jump === n) return false;
                // wrap-around feasibility check
                if (indices[i] + perimeter - indices[jump] < mn) break;
                count++;
                curr = jump;
            }
            if (count === k) return true;
        }
        return false;
    }

    let l = 1, h = side * 2;
    while (l < h) {
        const mid = Math.floor((l + h + 1) / 2);
        if (check(mid)) l = mid;
        else h = mid - 1;
    }
    return l;
}
