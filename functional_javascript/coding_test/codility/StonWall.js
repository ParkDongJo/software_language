function solution(A) {
    if (A.length == 0) return 1

    let checked = new Array(A.length + 1)
        
    for (let i=0; i<A.length; i++) {
        if (A[i] > 0 && A[i] < checked.length) {
            checked[A[i]] = true
        }
    }

    for (let i=1; i<checked.length; i++) {
        if (!checked[i]) return i;
    }
    return A.length + 1;
}

console.log(solution([1, 3, 6, 4, 1, 2]))
console.log(solution([1, 2, 3]))