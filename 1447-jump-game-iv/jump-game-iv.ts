function minJumps(arr: number[]): number {
    const n = arr.length;
    if (n === 1) return 0;

    const map = new Map<number, number[]>();

   
    for (let i = 0; i < n; i++) {
        if (!map.has(arr[i])) {
            map.set(arr[i], []);
        }
        map.get(arr[i])!.push(i);
    }

    const queue: [number, number][] = [[0, 0]];
    const visited = new Array(n).fill(false);
    visited[0] = true;

    let head = 0;

    while (head < queue.length) {
        const [i, steps] = queue[head++];

        if (i === n - 1) return steps;

      
        const same = map.get(arr[i]) || [];

        for (const next of same) {
            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, steps + 1]);
            }
        }

      
        map.delete(arr[i]);

      
        if (i - 1 >= 0 && !visited[i - 1]) {
            visited[i - 1] = true;
            queue.push([i - 1, steps + 1]);
        }

       
        if (i + 1 < n && !visited[i + 1]) {
            visited[i + 1] = true;
            queue.push([i + 1, steps + 1]);
        }
    }

    return -1;
}