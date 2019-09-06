/**
 * [3 문제 본문]
 */

/*
    A non-empty array A cosisting of N integers is given. Apair of indices (P,Q),
    where 0 <= P < Q < N, is said to have adjacent values if no value in the array
    lies strictly between values A[P] and A[Q].

    For example, in array A such that:
    
        A[0] = 0
        A[1] = 3
        A[2] = 3
        A[3] = 7
        A[4] = 5
        A[5] = 3
        A[6] = 11
        A[7] = 1

    the following pairs of indices have adjacent values:

        (0, 7), (1, 2), (1, 4),
        (1, 5), (1, 7), (2, 4),
        (2, 5), (2, 7), (3, 4),
        (3, 6), (4, 5), (5, 7).

    For example, indices 4 and 5 have adjacent values because there is no
    value in array A that lies strictly between A[4] = 5 and A[5] = 3; the only such
    value could be the number 4, and it is not present in the array.

    Given two indices P and Q, their distance is defined as abs(A[P] - A[Q]),
    where abs(X) = X for X >= 0, and abs(X) = -X for X < 0.
    For example, the distance between indices 4 and 5 is 2 because (A[4]-A[5]) = (5 - 3) = 2.

    Write a function:

    that, given a non-empty array A consisting of N integer, return the minimum distance
    between indisces of this array that have adjacent values.
    The function should return -1 if the minimum distance is greater than 100,000,000.
    The function should return -2 if no adjacent indices exist.

    For example, given array A such that:
    
        A[0] = 0
        A[1] = 3
        A[2] = 3
        A[3] = 7
        A[4] = 5
        A[5] = 3
        A[6] = 11
        A[6] = 1

    the function should return 0 because:
    - indices 1 and 2 are adjacent, because the array dose not contain any value
        that lies strictly between A[1] = 3 and A[2] = 3;
    - the distance between these indices is (A[1]-A[2]) = (3 - 3) = 0;
    - no other pair of adjacent indices that has smaller distance exists.

    Write an efficient algorithm for the following assumptions.
    - N is an integer within the range[1..40,000];
    - each element of array A is an integer within the range [-2,147,483,648..2,147,483,647]

*/

/*
    1. 충분히 문제를 생각하고 코드 작성
    2. empty N 에 대한 예외처리
    3. 한 문제당 시간을 다 쓰자
    4. 제출은 2~3분 남겨놓고 제출!!
    5. 예외 케이스를 최대한 생각해보자
    6. 문제를 제출 전에 복사해 두자
*/

function solution(A) {
    if (A.length <= 1) return -2;

    let numbers = A;
    let minDistance = Math.abs(numbers[0] - numbers[1]);
    numbers.sort((a,b) => a-b);
    
    for (let i=1; i<numbers.length-1; i++) {
        minDistance = Math.min(minDistance, Math.abs(numbers[i] - numbers[i+1]));
    }

    if (minDistance > 100000000) return -1;

    return minDistance;
}

console.log(solution([0,3,3,7,5,3,11,1]));
console.log(solution([1,2147483646]));
console.log(solution([1]));

