function furthestDistanceFromOrigin(moves: string): number {
    let L = 0, R = 0, blank = 0;

    for (let c of moves) {
        if (c === 'L') L++;
        else if (c === 'R') R++;
        else blank++;
    }

    return Math.abs(R - L) + blank;
}