function sortByPriceAscending(jsonString) {
    // Your code goes here
    let jsonArr = JSON.parse(jsonString);
    jsonArr.sort((prev, next) => { 
        if (prev.price == next.price) {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
        } else {
            return prev.price - next.price
        }
    });
    return JSON.stringify(jsonArr);
}
// console.log(sortByPriceAscending('[{"name":"eggs","price":1},{"name":"bab","price":4.04},{"name":"coffee","price":9.99},{"name":"rice","price":4.04}]'));
console.log(sortByPriceAscending('[{"name":"abe","price":1},{"name":"zdfsf","price":1},{"name":"aage","price":1},{"name":"bsfa","price":1}]'));