/**
 * [1 문제 본문]
 */
/*
    There are N coins, each showing either heads or tails. We would like all the
    coins to show the same face. What is the minimum number of coins that must be reversed?

    that, given an array A consisting of N integers representing the conins,
    returns the minimum number of coins that must be reversed. Consecutive elements of
    array A represent consecutive coins and contain only a 0 (heads) or a 1 (tails).

    For example, given arrray A=[1,0,0,1,0,0], there are four coins showing heads and two
    coins showing tails. The function should return 2, as after reversing two coins
    (in positions 0 and 3). all the coins will be showing the same face(heads).

    Assume that:

    - N is an integer within the range [1..100];
    - each element of array A is an integer that can have one of the following values: 0,1

    In your solution, focus on correctness. The performance of your solution will not be
    the focus of the assessment.
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
    if (A.length == 0) return 0;

    let coins = A;
    let zeroCnt = 0;
    let oneCnt = 0;

    for (let i=0; i<coins.length; i++) {
        zeroCnt += coins[i] == 0 ? 1 : 0;
    }
    
    return Math.min(zeroCnt, coins.length-zeroCnt);
};

console.log(solution([1,0,0,1,0,0]));