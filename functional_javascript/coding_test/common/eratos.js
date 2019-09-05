function useEratos(n) {
    let isPrime = new Array(n+1).fill(true)
    
    for (let i=2; i<=n; i++) {
        let idx = 1
        for (let j=i; j<=n; j=i*idx) {
            if (j != i) {
                isPrime[j] = false
            }
            idx++;
        }
    }

    let count = 0
    for (let i=2; i<=n; i++) {
        if (isPrime[i]) count++
    }

    return count
}

console.log(useEratos(20))


function getPrimeListByEratos(n) {
    let isPrime = new Array(n+1).fill(true)
    let primeList = []

    for (let i=2; i<=n; i++) {
        let idx =1
        for (let j=i; j<=n; j=i*idx) {
            if (j != i) {
                isPrime[j] = false
            }
            idx++
        }
    }

    for (let i=2; i<=n; i++) {
        if (isPrime[i]) primeList.push(i)
    }

    return primeList
}

console.log(getPrimeListByEratos(20))