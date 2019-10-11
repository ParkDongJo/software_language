// [0..100,000] 상황
// 100점
// O(N) or O(N * log(N))
function solution(A) {
    if (A.lenght == 0) return 1;

    let arr = Array.from(A);
    let originSum = 0;
    let arrSum = 0;
    let len = arr.length;

    for (let i=0; i<len; i++) {
        originSum += (i+1);
        arrSum += arr[i];
    }
    return originSum + (len + 1)  - arrSum;
}

console.log(solution([2,3,1,5]));
