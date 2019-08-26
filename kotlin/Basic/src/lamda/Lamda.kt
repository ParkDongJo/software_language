package lamda

fun main(args: Array<String>) {
    func1(a1 = {
        println("func1이 전달한 함수가 호출되었습니다.")
    })

    func2(a1 = {x: Int, y: Int ->
        println("func2 가 전달한 함수가 호출 되었습니다.")
        println("x: $x , y: $y")
    })

    func3(a1 = {x: Int, y: Int ->
        println("func3 가 전달한 함수가 호출 되었습니다.")
        // 가장 마지막에 작성된 결과값이 반환된다
        x + y
    })
    func3(a1 = {x: Int, y: Int ->
        println("func3 가 전달한 함수가 호출 되었습니다.")
        x + y
        x - y
    })
}

fun func1(a1: () -> Unit) {
    a1()
}

fun func2(a1: (Int, Int) -> Unit) {
    a1(100, 200)
}

fun func3(a1: (Int, Int) -> Int) {
    var a2: Int = a1(100, 200)
    println("a2: $a2")
}