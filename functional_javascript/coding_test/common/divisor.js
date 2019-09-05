function getDivisor(N) {
    let divArr = []
    let sqrtN = Math.sqrt(N)

    for (let i=0; i<sqrtN; i++) {
        if (N%i == 0) {
            divArr.push(i)
            divArr.push(N/i)
        }
    }
    divArr.sort((a,b) => a-b)

    return divArr
}

console.log(getDivisor(10))