function solution(N) {
    let binaryArr = N.toString(2).split('')
    let maxCnt = 0
    let count = 0

    for (let i=0; i<binaryArr.length; i++) {
        if (binaryArr[i] == '1') {
            maxCnt = Math.max(maxCnt, count)
            count = 0
        } else {
            count++
        }
    }
    return maxCnt
}

console.log(solution(1041))
console.log(solution(32))