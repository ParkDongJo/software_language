package `if`

fun main(agrs: Array<String>) {

    //if() ~ else ~
    var a1: Int = 100

    if (a1 > 50) {
        println("a1은 50보다 큽니다.")
    }

    if (a1 < 50) {
        println("a1은 50보다 작습니다.")
    }

    if (a1 > 50) {
        println("a1은 50보다 큽니다.")
    } else {
        println("a1은 50보다 크지 않습니다.")
    }

    if (a1 == 20) {
        println("a1은 20보다 입니다.")
    } else if (a1 == 50) {
        println("a1은 50보다 입니다.")
    } else if (a1 == 100) {
        println("a1은 100보다 입니다.")
    } else {
        println("어떤 구문도 해당하지 않습니다.")
    }


}