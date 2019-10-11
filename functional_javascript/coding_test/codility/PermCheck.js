
// 중복에 대한 생각을 못함!!
// 퍼포먼스 하나 안나옴
// 76점
// function solution(A) {
//     let max = Math.max(...A);
//     let originSum = 0;
//     let arrSum = 0;

//     for (let i=1; i<=max; i++) {
//         originSum += i;
//     }

//     for (let i=0, len=A.length; i<len; i++) {
//         arrSum += A[i];
//     }

//     return originSum == arrSum ? 1 : 0;
// }

// 100점
// O(N) or O(N * log(N))
function solution(A) {
    let max = Math.max(...A);
    let len = A.length;

    if (max !== len) return 0; 

    let cache = Array(max);
    for (let i=0; i<len; i++) {
        cache[A[i]-1] = A[i];
    }

    for (let i=0; i<max; i++) {
        if (cache[i] == undefined) return 0;
    }

    return 1;
}

console.log(solution([4,1,3,2]));
console.log(solution([1,3,2]));
console.log(solution([1,4,2]));
console.log(solution([3,4,2]));
console.log(solution([9, 5, 7, 3, 2, 7, 3, 1, 10, 8]));