function solution(A, K) {
    let arr = A
    if (A.length == 0) return [];

    for (let i=0; i<K; i++) {
        let temp = arr[arr.length-1];
        for (let j=arr.length-1; j>0; j--) {
            arr[j] = arr[j-1];
        }
        arr[0] = temp;
    }

    return arr;
}

console.log(solution([3, 8, 9, 7, 6], 3))