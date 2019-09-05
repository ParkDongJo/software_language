/**
 * Array - slice()
 */
let numbers = [1, 2, 3, 4, 5, 6, 7];
let front = numbers.slice(0, 4);
let back = numbers.slice(4, numbers.length)
let fromFront = numbers.slice(1);
let fromBack = numbers.slice(-1);

// console.log("front : " + front.toString());
// console.log("back : " + back.toString());
// console.log(fromFront)
// console.log(fromBack)

/**
 * Array - concat()
 */
let newArr = front.concat(back, [8, 9], [10, 11])
// console.log(newArr.toString())

/**
 * Array - join()
 */
let names = ['Shane', 'Alan', 'Osbourne'];
// /* 보통의 방식 */
// console.log(names[0] + ' ' + names[1] + ' ' + names[2]);
// /* join 방식 */
// console.log(names.join(' ')); // Shane Alan Osbourne
// console.log(names.join('-')); // Shane-Alan-Osbourne
// console.log(names.join('')); // ShaneAlanOsbourne
// /* 디폴트 separator: comma(,) */
// console.log(names.join()); // Shane,Alan,Osbourne

// 다른 메서드와 함께 사용한 예제
let name = 'shane osbourne';
let upper = name.split(' ')
 .map(x => x.charAt(0).toUpperCase() + x.slice(1))
 .join(' ');
console.log(upper);

/**
 * Array - indexOf()
 */
let family = ['Shane', 'Sally', 'Isaac'];
console.log(family.indexOf('Isaac')); // 2
console.log(family.indexOf('Kittie')); // -1

/**
 * Array - splice()
 */
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];
// 배열의 인덱스 2부터 1개를 제거
let remvoed1 = myFish.splice(2, 1); // ['angel', 'trumpet', 'surgeon'] / removed : ['clown']
console.log(remvoed1.toString())
console.log(myFish.toString())
// 배열의 인덱스 0부터 2개를 제거
let remvoed2 = myFish.splice(0, 2, 'parrot', 'anemone') // ['parrot', 'anemone', 'surgeon'] / remvoed2 : ['angel', 'trumpet']
console.log(remvoed2.toString())
console.log(myFish.toString())

/**
 * Array - find
 */
let array1 = [5, 12, 8, 130, 44];
let found = array1.find((e) => e > 10);
let idx = array1.findIndex((e) => e > 10);

console.log(found)
console.log(idx)