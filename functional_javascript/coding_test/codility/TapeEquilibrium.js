// 시간복잡도를 억지로 줄이고자 할 필요는 없다.

// 시간이 많이 남았다면,
// 예외 케이스를 많이 돌려보는게 좋다.
// 예외 케이스에 대한 규칙을 알아보고 만들어보자!!

// javascript의 호이스팅 및 undefind를 활용하자!!

// 7 점
// 76 점
// 100 점

// O(N)
function solution(A) {
    let rightSum = A.reduce((a,b) => a + b, 0);
    let leftSum = 0;
    let min;
    let diff;
    // let min = Math.max.apply(Math, A); // or Math.max(...A);

    for (let i=0, len=A.length; i<len-1; i++) {
        leftSum += A[i];
        rightSum -= A[i];
        diff = Math.abs(leftSum-rightSum);

        if (min == undefined) min = diff;
        min = Math.min(diff, min);
    }
    
    return min;
}

console.log(solution([3,1,2,4,3]))
console.log(solution([1,1]))
console.log(solution([-1000, 1000]))