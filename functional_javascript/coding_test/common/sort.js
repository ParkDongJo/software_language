/**
 * 알고리즘 테스트에서는 sort() 함수를 적극적으로 쓰자
 */
let numbers = [1, 4, 2, 2, 5, 6];
numbers.sort();
console.log(numbers.toString());

numbers.sort((a, b) => a-b);
console.log(numbers.toString());


numbers.reverse()
console.log(numbers.toString());

numbers.sort((a, b) => b-a);
console.log(numbers.toString());



var fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();
console.log(fruits.toString());


console.log("Quick Sort========================");
/**
 * Quick sort 함수
 * @param {*} arr 
 * @param {*} start 
 * @param {*} end 
 */
function quickSort(arr, start, end) {
    if (start >= end) return;

    // 좌 우 뽑기
    let left = new Array(100);
    let right = new Array(100);
    // 피벗 뽑기
    let pivot = arr[start];

    // 피벗 기준으로 좌배열 우배열 뽑기
    let leftCnt = getLeft(arr, start+1, end, pivot, left);
    let rightCnt = getRight(arr, start+1, end, pivot, right);

    // 좌배열 + 피벗 + 우배열
    for (let i=0; i<leftCnt; i++) {
        arr[start+i] = left[i];
    }
    arr[start + leftCnt] = pivot;
    for (let i=0; i<rightCnt; i++) {
        arr[start + leftCnt + 1 + i] = right[i];
    }

    // 좌배열 -> 동일하게 분할
    quickSort(arr, start, start+leftCnt-1);
    // 우배열 -> 동일하게 분할
    quickSort(arr, start+leftCnt+1, end);
}

function getLeft(arr, start,end, pivot, left) {
    let idx = 0
    for (let i=start; i<=end; i++) {
        if (pivot >= arr[i]) {
            left[idx++] = arr[i]
        }
    }
    return idx;
}

function getRight(arr, start,end, pivot, right) {
    let idx = 0
    for (let i=start; i<=end; i++) {
        if (pivot < arr[i]) {
            right[idx++] = arr[i]
        }
    }
    return idx;
}

let arr = [10,3,1,5,4,7,9,2,6,8]
quickSort(arr, 0, arr.length-1)
console.log(arr)


console.log("Merge Sort========================");
function mergeSort(arr, start, end) {
    if (start >= end) return;

    // 중간지점 뽑기
    let mid = parseInt((start + end) /2);

    // 중간지점을 중심으로 왼쪽을 계속 쪼게기
    mergeSort(arr, start, mid);
    // 중간지점을 중심으로 오른쪽을 계속 쪼게기
    mergeSort(arr, mid+1, end);

    // 잘개 쪼개진 배열 병합
    merge(arr, start, mid, mid+1, end);
}

function merge(arr, start1, end1, start2, end2) {
    let temp = new Array(100);
    let idx = 0;

    let cursor1 = start1;
    let cursor2 = start2;

    while (cursor1 <= end1 && cursor2 <= end2) {
        if (arr[cursor1] <= arr[cursor2]) {
            temp[idx++] = arr[cursor1];
            cursor1++;
        } else {
            temp[idx++] = arr[cursor2];
            cursor2++;
        }
    }

    if (cursor1 <= end1) {
        for (let i=cursor1; i<=end1; i++) {
            temp[idx++] = arr[i];
        }
    }

    if (cursor2 <= end2) {
        for (let i=cursor2; i<=end2; i++) {
            temp[idx++] = arr[i];
        }
    }

    for (let i=start1; i<=end2; i++) {
        arr[i] = temp[i-start1];
    }
}

let arr2 = [10,3,1,5,4,7,9,2,6,8];
mergeSort(arr2, 0, arr2.length-1);
console.log(arr2)
