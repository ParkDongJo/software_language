/**
 * 주의할 것 javascript는 수 체계가 아주.. 거지같다.
 */

 let a = 10;
 let b = 20;
 console.log(Math.max(a,b))
 console.log(Math.min(a,b))
 console.log(Math.abs(a-b))
 console.log(Math.sqrt(b))
 // 숫자를 문자열로 변환하면서 지정된 소수점 이하 숫자를 반올림
 console.log(Math.sqrt(b).toFixed(1))
 console.log(Math.sqrt(b).toPrecision(1))
 // 그래서, 이렇게 바로 Int형으로 바꿔주자
 console.log(parseInt(Math.sqrt(b)))



 // 절삭
let n = 2117;
n = Math.floor(n/10) * 10; // 10으로 나누면 211.7, floor 함수로 소수점을 버리면 211, 다시 10을 곱하면 2110 alert(n); // 2110 
console.log(n)
