function earliestFinishTime(
    landStartTime: number[],
    landDuration: number[],
    waterStartTime: number[],
    waterDuration: number[]
): number {

    function build(start: number[], dur: number[]) {
        let arr: [number, number][] = [];

        for (let i = 0; i < start.length; i++) {
            arr.push([start[i], dur[i]]);
        }

        arr.sort((a, b) => a[0] - b[0]);

        let n = arr.length;
        let starts = arr.map(x => x[0]);

        let prefixMinDur = Array(n).fill(0);
        prefixMinDur[0] = arr[0][1];
        for (let i = 1; i < n; i++) {
            prefixMinDur[i] = Math.min(prefixMinDur[i - 1], arr[i][1]);
        }

        let suffixMinFinish = Array(n).fill(0);
        suffixMinFinish[n - 1] = arr[n - 1][0] + arr[n - 1][1];
        for (let i = n - 2; i >= 0; i--) {
            suffixMinFinish[i] = Math.min(
                suffixMinFinish[i + 1],
                arr[i][0] + arr[i][1]
            );
        }

        return { starts, prefixMinDur, suffixMinFinish };
    }

    function query(
        t: number,
        starts: number[],
        prefixMinDur: number[],
        suffixMinFinish: number[]
    ): number {
        let n = starts.length;

        let l = 0, r = n;
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            if (starts[mid] <= t) l = mid + 1;
            else r = mid;
        }

        let ans = Infinity;

        if (l > 0) {
            ans = Math.min(ans, t + prefixMinDur[l - 1]);
        }

        if (l < n) {
            ans = Math.min(ans, suffixMinFinish[l]);
        }

        return ans;
    }

    let land = build(landStartTime, landDuration);
    let water = build(waterStartTime, waterDuration);

    let ans = Infinity;
    for (let i = 0; i < landStartTime.length; i++) {
        let finishLand = landStartTime[i] + landDuration[i];
        ans = Math.min(
            ans,
            query(
                finishLand,
                water.starts,
                water.prefixMinDur,
                water.suffixMinFinish
            )
        );
    }

    for (let j = 0; j < waterStartTime.length; j++) {
        let finishWater = waterStartTime[j] + waterDuration[j];
        ans = Math.min(
            ans,
            query(
                finishWater,
                land.starts,
                land.prefixMinDur,
                land.suffixMinFinish
            )
        );
    }

    return ans;
}