package operator

fun main(args: Array<String>) {

    // 단항 연산자
    println("단항 연산자-------------------")
    var a1: Int = 10
    var a2: Int = -a1
    println("a2: $a2")

    a2 = a1.unaryMinus()
    println("a2: $a2")

    a2 = +a1
    println("a2: $a2")

    a2 = a1.unaryPlus()
    println("a2: $a2")

    var a3: Boolean = true
    var a4: Boolean = !a3
    println("a4: $a4")

    a4 = a3.not()
    println("a4: $a4")


    //증감 연산자
    println("증감 연산자-------------------")
    var a5: Int = 10
    var a6: Int = 10
    var a7: Int = a5++
    var a8: Int = a6--

    println("a5: $a5 => a7: $a7")
    println("a5: $a6 => a7: $a8")

    a5 = 10
    a6 = 10
    var a9: Int = ++a5
    var a10: Int = --a6

    println("a5: $a5 => a9: $a9")
    println("a5: $a6 => a10: $a10")

    a5 = 10
    a6 = 10
    a7 = a5.inc()
    a8 = a6.dec()
    println("a5: $a5 => a7: $a7")
    println("a5: $a6 => a7: $a8")


    //산술 연산자
    println("산술 연산자-------------------")
    a5 = 10
    a6 = 3
    a7 = a5 + a6
    a8 = a5.plus(a6)
    println("a7: $a7")
    println("a8: $a8")

    a7 = a5 - a6
    a8 = a5.minus(a6)
    println("a7: $a7")
    println("a8: $a8")

    a7 = a5 * a6
    a8 = a5.times(a6)
    println("a7: $a7")
    println("a8: $a8")

    a7 = a5 / a6
    a8 = a5.div(a6)
    println("a7: $a7")
    println("a8: $a8")

    a7 = a5 % a6
    a8 = a5.rem(a6)
    println("a7: $a7")
    println("a8: $a8")

    var a11 = a6..a5
    var a12 = a6.rangeTo(a5)
    println("a11: $a11")
    println("a12: $a12")


    // 대입 연산자
    println("대입 연산자-------------------")
    var a13 = 10
    a13 += 3
    println("a13: $a13")

    a13 = 10
    a13 -= 3
    println("a13: $a13")

    a13 = 10
    a13 *= 3
    println("a13: $a13")

    a13 = 10
    a13 /= 3
    println("a13: $a13")

    a13 = 10
    a13 %= 3
    println("a13: $a13")


    // 비교
    println("비교 연산자-------------------")
    // 함수를 쓴다고 크게 얻는 이점은 없다..
    // 그냥 함수형 프로그래밍 빠들이 많이 쓸거 같음
    a13 = 10
    var a14 = a13 == 10
    var a15 = a13.equals(10)    // 딱히 쓸 이유가 없음
    var txt1: String = "같다"
    var txt2: String = "같다"
    var a16 = txt1 == txt2
    println("a14: $a14")
    println("a15: $a15")
    println("a16: $a16")

    a14 = a13 != 10
    println("a14: $a14")

    a14 = a13 > 20
    a15 = a13.compareTo(20) > 0
    a16 = a13 < 20
    var a17 = a13.compareTo(20) < 0
    println("a14: $a14")
    println("a15: $a15")
    println("a16: $a16")
    println("a17: $a17")


}