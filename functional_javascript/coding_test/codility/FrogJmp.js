function solution(X, Y, D) {
    let count = parseInt((Y-X) /D);

    if ((Y-X) % D == 0) {
        return count;
    } else {
        return count + 1;
    }
}

console.log(solution(10,85,30))