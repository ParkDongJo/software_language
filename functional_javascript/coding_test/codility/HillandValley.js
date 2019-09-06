/**
 * [2 문제 본문]
 */

 /*
    Charlesmagne, the King of Frankia, is considering building some castles on the
    border with Servia. The border is divided into N segments. The King knows the height
    of the terrain in each segment of the border. The height of each segment of terrain is stored
    in array A, with A[P] denoting the height of the P-th segment of the border.
    The King has decided to build a castle on top of every hill and in the bottom of every valley.

    Let [P..Q] denote a group of consecutive segments from P to Q inclusive such that
    (0 <= P <= Q <= N-1). Segments [P..Q] from a hill or a valley if all the following conditions are satisfied.

    - The terrain height of each segment from P to Q is the same (A[P] = A[P+1] = .. = A[Q]);
    - If P > 0 the A[P-1] < A[P] (for a hill) or A[P-1] > A[P] (for a vally)
    - If Q < N-1 then A[Q+1] < A[Q] (for a hill) of A[Q+1] > A[Q] (for a valley)

    That is, a hill is higher than its surroundings and a valley is lower than its surroundings.
    Note that if the surroundings on either side of the hill or valley don't exist 
    (i.e. at the edges of the area under considerration, where P =0 or Q = N-1),
    then the condition is considered satisfied for that side of the hill/valley.

    The king is wondering how many castles is he going to build. Can you help him?

    [image]
    
    For example, consider the following array A=[2,2,3,4,3,3,2,2,1,1,2,5]
    There are two hills: [3..3] and [11..11]. There are also two valleys: [0..1] and [8..9].
    There are no other suitable places for castles.

    Write a function:
    that, given an array A consisting of N integers, as explained above, returns the total number
    of hills and valleys.

    For example, given array A as described above, the function should return 4,

    Given array A=[-3,-3] describing segments with a terrain height below 0,
    segment [0..1] froms both a hill and a valley, and only one castle can be built,
    so the function should return 1.

    Write an efficient algorithm for the following assumptions.

    - N is an integer within the range [1..100,000]
    - each element of array A is an integer within the range [-1,000,000,000 .. 1,000,000,000].
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
    if (A.length==0) return 0;

    let heights = A;
    let prev = heights[0];
    let count = 0;

    for (let i=0; i<heights.length-1; i++) {
        
        if (heights[i] < heights[i+1]) {
            if (prev >= heights[i]) {
                count++;
                prev = heights[i];
            }
        } else {
            if (prev <= heights[i]) {
                count++;
                prev = heights[i];
            }
        }
    }

    return count;
}

console.log(solution([2,2,3,4,3,3,2,2,1,1,2,5]))
console.log(solution([-3,-3]))
console.log(solution([-3,1,2,2,1,-3]))


