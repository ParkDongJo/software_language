function euclid(a, b) {
    if (b==0) return a;
    return euclid(b, a%b);
}

console.log(euclid(10, 5))