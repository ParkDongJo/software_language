function binarySearch(arr, start, end, value) {
    if (start > end) {
        return -1;
    } else if (start==end) {
        if (arr[start] == value) {
            return start;
        } else {
            return -1;
        }
    } else {
        const mid = parseInt( (start+end)/2 );

        if (arr[mid] == value) {
            return mid;
        } else if (arr[mid] > value) {
            return binarySearch(arr, start, mid-1, value);
        } else {
            return binarySearch(arr, mid+1, end, value);
        }
    }
}

let arr = [1, 2, 4, 8, 10, 11, 12, 14, 15, 19];
let idx = binarySearch(arr, 0, arr.length-1, 10);
console.log(idx);