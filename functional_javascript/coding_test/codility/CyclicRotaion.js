// empty array 에 대한 대비를 해놓자.
// 문제에서 not empty라고 하지 않는 이상

// 100점
function solution(arr, k) {
    if (arr.length == 0) return [];

    let array = Array.from(arr);
    let len = array.length;
    let tmp;

    for (let i=0; i<k; i++) {
        tmp = array[len-1];
        for (let j=len-1; j>0; j--) {
            array[j] = array[j-1];
        }
        array[0] = tmp;
    }

    return array;
}

console.log(solution([3, 8, 9, 7, 6], 3));
console.log(solution([0, 0, 0], 1));
console.log(solution([1, 2, 3, 4], 4));