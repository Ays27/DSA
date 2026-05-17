function canReach(arr: number[], start: number): boolean {
    let visited = new Array(arr.length).fill(false);

    function dfs(i: number): boolean {
      
        if (i < 0 || i >= arr.length) return false;
        if (visited[i]) return false;

        if (arr[i] === 0) return true;
        visited[i] = true;

        return dfs(i + arr[i]) || dfs(i - arr[i]);
    }

    return dfs(start);
}