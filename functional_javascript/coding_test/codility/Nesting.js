function solution(S) {
    if (S == "") return 0
    
    let stack = []
    let chars = S.split("")

    for (let i=0; i<chars.length; i++) {
        if (chars[i] == '(') {
            stack.push(chars[i]);
        } else {
            if (stack.length == 0) {
                return 0;
            } else {
                stack.pop();
            }
        }
    }

    return stack.length == 0 ? 1 : 0;
}

console.log(solution("(()(())())"));
console.log(solution("())"));