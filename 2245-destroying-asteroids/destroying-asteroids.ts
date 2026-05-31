function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    asteroids.sort((a, b) => a - b);

    let curMass = BigInt(mass);

    for (let asteroid of asteroids) {
        if (curMass < BigInt(asteroid)) {
            return false;
        }
        curMass += BigInt(asteroid);
    }

    return true;
}