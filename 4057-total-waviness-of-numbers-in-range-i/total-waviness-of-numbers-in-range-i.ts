function totalWaviness(num1: number, num2: number): number {
    function solve(n: number): bigint {
        if (n < 0) return 0n;

        const digits = String(n).split("").map(Number);
        const memo = new Map<string, [bigint, bigint]>();

        function dp(
            pos: number,
            tight: number,
            state: number, 
            
            last1: number,
            last2: number
        ): [bigint, bigint] {
            if (pos === digits.length) {
                return [1n, 0n];
            }

            const key = `${pos}|${tight}|${state}|${last1}|${last2}`;
            if (!tight && memo.has(key)) {
                return memo.get(key)!;
            }

            const limit = tight ? digits[pos] : 9;

            let totalCount = 0n;
            let totalSum = 0n;

            for (let d = 0; d <= limit; d++) {
                const ntight = tight && d === limit ? 1 : 0;

                if (state === 0) {
                    if (d === 0) {
                        const [cnt, sum] = dp(
                            pos + 1,
                            ntight,
                            0,
                            0,
                            0
                        );
                        totalCount += cnt;
                        totalSum += sum;
                    } else {
                        const [cnt, sum] = dp(
                            pos + 1,
                            ntight,
                            1,
                            d,
                            0
                        );
                        totalCount += cnt;
                        totalSum += sum;
                    }
                } else if (state === 1) {
                    const [cnt, sum] = dp(
                        pos + 1,
                        ntight,
                        2,
                        d,
                        last1
                    );

                    totalCount += cnt;
                    totalSum += sum;
                } else {
                    let add = 0n;

                    if (
                        (last1 > last2 && last1 > d) ||
                        (last1 < last2 && last1 < d)
                    ) {
                        add = 1n;
                    }

                    const [cnt, sum] = dp(
                        pos + 1,
                        ntight,
                        2,
                        d,
                        last1
                    );

                    totalCount += cnt;
                    totalSum += sum + cnt * add;
                }
            }

            const res: [bigint, bigint] = [totalCount, totalSum];

            if (!tight) {
                memo.set(key, res);
            }

            return res;
        }

        return dp(0, 1, 0, 0, 0)[1];
    }

    return Number(solve(num2) - solve(num1 - 1));
}