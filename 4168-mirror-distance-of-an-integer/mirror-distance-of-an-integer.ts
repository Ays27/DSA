function mirrorDistance(n: number): number {
  
    const str = n.toString();

    
    const reversedStr = str.split('').reverse().join('');

   
    const reversed = Number(reversedStr);

    
    return Math.abs(n - reversed);
}