function earliestFinishTime(
    landStartTime: number[],
    landDuration: number[],
    waterStartTime: number[],
    waterDuration: number[]
): number {

    function build(start: number[], dur: number[]) {
        const rides = start.map((s, i) => [s, dur[i]] as [number, number]);
        rides.sort((a, b) => a[0] - b[0]);

        const n = rides.length;

        const starts = new Array<number>(n);
        const prefixMinDur = new Array<number>(n);
        const suffixMinFinish = new Array<number>(n);

        for (let i = 0; i < n; i++) {
            starts[i] = rides[i][0];
        }

        for (let i = 0; i < n; i++) {
            prefixMinDur[i] =
                i === 0
                    ? rides[i][1]
                    : Math.min(prefixMinDur[i - 1], rides[i][1]);
        }

        for (let i = n - 1; i >= 0; i--) {
            const finish = rides[i][0] + rides[i][1];
            suffixMinFinish[i] =
                i === n - 1
                    ? finish
                    : Math.min(suffixMinFinish[i + 1], finish);
        }

        function query(x: number): number {
            let l = 0;
            let r = n;

            while (l < r) {
                const mid = (l + r) >> 1;
                if (starts[mid] >= x) r = mid;
                else l = mid + 1;
            }

            const idx = l;
            let res = Number.MAX_SAFE_INTEGER;

            if (idx < n) {
                res = Math.min(res, suffixMinFinish[idx]);
            }

            if (idx > 0) {
                res = Math.min(res, x + prefixMinDur[idx - 1]);
            }

            return res;
        }

        return query;
    }

    const bestWaterAfter = build(waterStartTime, waterDuration);
    const bestLandAfter = build(landStartTime, landDuration);

    let ans = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < landStartTime.length; i++) {
        const landFinish = landStartTime[i] + landDuration[i];
        ans = Math.min(ans, bestWaterAfter(landFinish));
    }

    for (let j = 0; j < waterStartTime.length; j++) {
        const waterFinish = waterStartTime[j] + waterDuration[j];
        ans = Math.min(ans, bestLandAfter(waterFinish));
    }

    return ans;
}