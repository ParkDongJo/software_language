/**
 * [4 문제 본문]
 */
/*
    You want to spend your next vacation in a foreign country. In the summer
    you are free for N consecutive days. You have consulted Travel Agency and
    learned that they are offering a trip to some interesting location in the country
    every day. For simplicity, each location is identified by a number from 0 to N -1.
    Trips are described in a non-empty array A: for each K (0<= K < N), A[K] is the identifier
    of a location which is the destination of a trip offered on day K. Travel Agency does not
    have to offer trips to all locations, and can offer more than one trip to some locations.

    You want to go on a trip every day during your vacation Moreover, you want to visit
    all locaions offerd by Travel Agency. You may visit the same location more than once,
    but you want to minimize duplicate visits. The goal is to find the shortest vaction
    (a range of consecutive days) that will allow you to visit all the locations offered
    Travel Agency.

    For example, consider array A such that:
    
        A[0] = 7
        A[1] = 3
        A[2] = 7
        A[3] = 3
        A[4] = 1
        A[5] = 3
        A[6] = 4
        A[7] = 1
    
    Travel Agency offers trips to four different locations (identified by numbers 1, 3, 4 and 7).
    The shortest vacation starting on day 0 that allows you to visit all these locations ends on
    day 6 (thus is seven days long).
    However, a shorter vaction of five days (starting on day 2 and ending on day 6) also permits
    you to visit all locations. On every vacation shorter than five days, you will have to miss
    at least one location.

    Write a function:

    that, given a non-empty array A consisting of N integers, returns the length of the shortest
    vacation that allows you to visit all the offered locations.

    For example, given array A shown above, the function should return 5, as explained above.
    
    Given A=[2,1,1,3,2,1,1,3], the function should return 3. One of the shortest vacations that
    visits all the places starts on day 3 (counting from 0) and lasts for 3 days.

    Given A=[7,5,2,7,2,7,4,7], the function should return 6. The shortest vaction that visits all
    the places starts on day 1(counting from 0) and lasts for 6 dyas.

    Write an efficient algorithm for the following assumptions:
    - N is an integer within the range [1..100,000];
    - each element of array A is an integer within the range [0..N-1]
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
    let schedule = A;
    let lastVisitDays = new Array(A.length).fill(0);
    let locationCnt = 0;
    let visited = new Set();

    for (let i=0; i<schedule.length; i++) {
        lastVisitDays[schedule[i]] = i;
    }

    for (let i=0; i<lastVisitDays.length; i++) {
        if (lastVisitDays[i] != 0) {
            locationCnt++;
        }
    }

    let min = A.length;
    let count = 0;
    for(let start=0; start<schedule.length; start++) {
        count = 0;
        for (let cursor=start; cursor<schedule.length; cursor++) {
            count++;
            if (!visited.has(schedule[cursor])) {
                visited.add(schedule[cursor]);
            }
    
            if (visited.size == locationCnt) {
                visited = new Set();
                min = Math.min(min, count);
                break;
            }
        }
    }
    return min;
}

function solutionAtype(A) {
    let schedule = A;
    let locations = new Set();
    let visited = new Set();
    let min = A.length;

    for (let i=0; i<schedule.length; i++) {
        locations.add(schedule[i]);
    }

    for (let i=0; i<schedule.length-1; i++) {
        let days = 0;
        for (let j=i; j<schedule.length; j++) {
            days++;
            visited.add(schedule[j]);
    
            if (days > min) break;

            if (visited.size == locations.size) {
                min = Math.min(min, days);
                visited.clear();
                break;
            }
        }
    }
    
    return min;
}

/*
    나름 몇가지 조건들을 통해서 성능을 A타입보다 개선하긴 했다.
    방문한 지역이 locations 갯수와 동일할 때마다, min 값을 비교하여, min을 갱신한다.
    그리고 더이상 2차 루프를 타는 것을 벗어난다.

    또한 이미 min값보다 넘어가는 경우도 break를 걸어 2차 루프를 타는 것을 벗어난다.

    하지만 문제는 매번 set을 비워주는 작업을 하는 것이다.
    set.clear()나 new Set() 같은 경우 내부적으로 set() 안에 있는 값을 제거하기 위해,
    O(N)의 시간복잡도를 가질것이다. new Set() 같은경우는 gc가 해당 값을 처리한다고, O(N) 이 걸릴것이다.
    
    그래서, 아래의 코드는(A타입도 마찬가지) 실제로 O(N^3)의 시간복잡도를 가
*/
function solutionBtype(A) {
    let schedule = A;
    let locations = new Set();
    let visited = new Set();
    let min = A.length;
    let days;

    for (let i=0; i<schedule.length; i++) {
        locations.add(schedule[i]);
    }

    for (let i=0; i<schedule.length-(1+locations.size); i++) {
        days = 0;
        for (let j=i; j<schedule.length; j++) {
            days++;
            visited.add(schedule[j]);

            if (days > min) break;
    
            if (visited.size == locations.size) {
                min = Math.min(min, days);
                visited.clear();
                break;
            }
        }
    }

    return min;
}

/*
    그렇다면, 어떻게든 이 문제의 시간복잡도를 통과하려면,
    효율적인 DP cache를 생각 해내던지
    또는, 반복문을 무조건 1차원 적으로 풀어내야 하는것 뿐이다.

    1차원 loop로 구현하려면, start와 end 포인트를 각각 알아내는 방법을 생각해야한다.

    하지만, 이건 오류가 있다!!!
    start나 end의 기준을 1차원 loop만을 통해서는 불가능하다고 판단됐다.

    아래와 같이 구현하였으나, 이는 논리적인 오류가 있다.
    start나 end를 찾는 기준이 예외가 매번 존재했다.
*/
function solutionCtype(A) {
    let schedule = A;
    let locations = new Set();
    let visited = new Set();
    let min = A.length;
    let days;
    let start = 0;
    let end = schedule.length - 1;

    for (let i=0; i<schedule.length; i++) {
        locations.add(schedule[i]);
    }

    for (let i=0; i<schedule.length; i++) {
        visited.add(schedule[i]);

        if (visited.size == locations.size) {
            end = i;
            visited.clear();
            break;
        }
    }

    for (let i=end; i>=0; i--) {
        visited.add(schedule[i]);

        if (visited.size == locations.size) {
            start = i;
            break;
        }
    }
    
    return end - start +1;
}

/*
    그렇다면!!!
    시간복잡도는 O(N^2)를 염두해 두고 짠다고 했을때, 2차원 loop에서
    실제로 O(N)이 돌지 않도록 하는 방법을 생각해야했다.    

    cache에 특정 정보들을 저장하면서,
    2차원 loop를 돌게끔 해야한다.
    cache 를 clear() 하는 방법도 넣어서는 안된다.

    그렇다면 공간복잡도를 높이더라도, Map() 을 이용해서 {key: index, visited: Set()}
    으로 계속 체크 해야한다.

    그러면 두 루프는 사실상 1 + 2 + 3 + 4 + 5 + 6 .. 처럼 돌게 되고
    O(N^2) 으로 볼수 있지만
    실제 시간복잡도는 어떠한 경우든 O(1/2*n^2)
    
*/
function solutionDtype(A) {
    let schedule = A;
    let locations = new Set();
    let visitedMap = new Map();
    let min = schedule.length;

    for (let i=0; i<schedule.length; i++) {
        locations.add(schedule[i]);
    }

    for (let i=0; i<schedule.length; i++) {
        visitedMap.set(i, new Set().add(schedule[i]));

        visitedMap.forEach((visited, start, map) => {
            visited.add(schedule[i])

            if (visited.size == locations.size) {
                min = Math.min(min, i-start+1);
            }
        })
    }
    
    return min;
}

// console.log(solution([7,3,7,3,1,3,4,1]));
// console.log(solution([2,1,1,3,2,1,1,3]));
// console.log(solution([7,5,2,7,2,7,4,7]));
// console.log(solution([7,7,7,7,7,7,7,7]));
// console.log(solution([7,7,7,6,7,7,7,7]));
// console.log(solution([1,2,3,4,5,6,7,8]));


// console.log(solutionAtype([7,3,7,3,1,3,4,1]));
// console.log(solutionAtype([2,1,1,3,2,1,1,3]));
// console.log(solutionAtype([7,5,2,7,2,7,4,7]));
// console.log(solutionAtype([7,7,7,7,7,7,7,7]));
// console.log(solutionAtype([7,7,7,6,7,7,7,7]));
// console.log(solutionAtype([1,2,3,4,5,6,7,8]));


// console.log(solutionBtype([7,3,7,3,1,3,4,1]));
// console.log(solutionBtype([2,1,1,3,2,1,1,3]));
// console.log(solutionBtype([7,5,2,7,2,7,4,7]));
// console.log(solutionBtype([7,7,7,7,7,7,7,7]));
// console.log(solutionBtype([7,7,7,6,7,7,7,7]));
// console.log(solutionBtype([1,2,3,4,5,6,7,8]));


// console.log(solutionCtype([7,3,7,3,1,3,4,1]));
// console.log(solutionCtype([2,1,1,3,2,1,1,3]));
// console.log(solutionCtype([7,5,2,7,2,7,4,7]));
// console.log(solutionCtype([7,7,7,7,7,7,7,7]));
// console.log(solutionCtype([7,7,7,6,7,7,7,7]));
// console.log(solutionCtype([1,2,3,4,5,6,7,8]));


// console.log(solutionDtype([7,3,7,3,1,3,4,1]));
// console.log(solutionDtype([2,1,1,3,2,1,1,3]));
// console.log(solutionDtype([7,5,2,7,2,7,4,7]));
// console.log(solutionDtype([7,7,7,7,7,7,7,7]));
// console.log(solutionDtype([7,7,7,6,7,7,7,7]));
// console.log(solutionDtype([1,2,3,4,5,6,7,8]));


let startTime1 = new Date().getTime();
console.log(solutionAtype([1,2,3,4,5,6,7,8]));
let endTime1 = new Date().getTime();

console.log("A 타입 : "+(endTime1-startTime1));

let startTime2 = new Date().getTime();
console.log(solutionBtype([1,2,3,4,5,6,7,8]));
let endTime2 = new Date().getTime();

console.log("B 타입 : "+(endTime2-startTime2));

let startTime3 = new Date().getTime();
console.log(solutionDtype([1,2,3,4,5,6,7,8]));
let endTime3 = new Date().getTime();

console.log("D 타입 : "+(endTime3-startTime3));



// function solution(A) {
//     let schedule = A;
//     let lastVisitDays = new Array(A.length).fill(0);
//     let locationCnt = 0;
//     let visited = new Set();
//     let startDay = A.length;
//     let lastDay = A.length;
    

//     for (let i=0; i<schedule.length; i++) {
//         lastVisitDays[schedule[i]] = i;
//     }

//     for (let i=0; i<lastVisitDays.length; i++) {
//         if (lastVisitDays[i] != 0) {
//             startDay = Math.min(startDay, lastVisitDays[i]);
//             locationCnt++;
//         }
//     }

//     for (let i=0; i<schedule.length; i++) {
//         if (lastVisitDays[])
//     }

//     // console.log(lastVisitDays);
//     console.log(startDay);
//     // console.log(locationCnt);

//     for (let i=startDay; i<schedule.length; i++) {
//         if (!visited.has(schedule[i])) {
//             visited.add(schedule[i]);
//         }

//         if (visited.size == locationCnt) {
//             lastDay = i+1;
//             break;
//         }
//     }
//     console.log(lastDay);

//     return lastDay-startDay+1;
// }
