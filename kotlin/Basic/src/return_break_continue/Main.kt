package return_break_continue

fun main(args: Array<String>) {

    // 함수의 return
    func1(5)
    func1(10)


    // 반복문 내 break 문
    var a1: Int = 0
    while(a1 < 10) {
        a1++
        if (a1 > 5) {
            break
        }

        println("a1 : $a1")
    }

    println("----------")


    // 반복문 내 continue
    a1 = 0
    while(a1 < 10) {
        a1++
        if (a1 % 2 == 0) {
            continue
        }

        println("a1 : $a1")
    }
}

fun func1(a1: Int): Unit {
    if (a1 == 10) {
        println("return")
        return
    }
    println("여기까지 올까요?")
}


