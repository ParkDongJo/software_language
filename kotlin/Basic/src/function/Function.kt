package function

fun main(args: Array<String>) {
    func1()

    func2(100, 55.5)

    func3(100)
    func3(100, 55.5)
    func3(a1 = 200, a2 = 66.66)
    func3(a2 = 66.66, a1 = 200)
    func3(a2 = 66.66)

    func4()
    func5()

    func6()
    func6(10)
    func6(55.5)
    func6(100, 200)

    func7()
}

fun func1() {
    println("func1가 호출 되었습니다.")
}

fun func2(a1: Int, a2: Double) {
    println("func2가 호출 되었습니다.")
    println("a1: $a1, a2: $a2")
}

fun func3(a1: Int = 0, a2: Double = 0.0) {
    println("func3가 호출 되었습니다.")
    println("a1 : $a1, a2: $a2")
}

fun func4() : Unit {
    // 반환타입이 없을 때 Unit, java void와 같음
    println("func4가 호출 되었습니다.")
}

fun func5() : Int {
    println("func5가 호출 되었습니다.")
    return 100
}

// 함수 오버로딩
// 오버로딩(overloading)은 이름이 동일한 함수이긴 한데 매개 변수의 개수가 다르거나 매개 변수의 자료형이 다른 함수를 가리키는 용어다.
fun func6() {
    println("func6가 호출 되었습니다.")
    println("매개변수 없음")
}

fun func6(a1: Int) {
    println("func6가 호출 되었습니다.")
    println("매개변수 a1 정수: $a1")
}

fun func6(a1: Double) {
    println("func6가 호출 되었습니다.")
    println("매개변수 a1 실수: $a1")
}

fun func6(a1: Int, a2: Int) {
    println("func6가 호출 되었습니다.")
    println("매개변수 a1: $a1, a2: $a2")
}


fun func7() {
    fun func8() {
        println("func8가 호출 되었습니다.")
    }
    println("func7가 호출 되었습니다")
    // func8은 func7 안에서만 호출 가능하다.
    func8()
}
