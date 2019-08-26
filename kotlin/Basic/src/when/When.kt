package `when`

import function.func3

fun main(args: Array<String>) {
    var a1: Int = 2

    when(a1) {
        1 -> {
            println("a1 1 입니다.")
        }
        2 -> {
            println("a1 2 입니다.")
        }
        3 -> {
            println("a1 3 입니다.")
        }
        else -> {
            println("모두 아닙니다.")
        }
    }

    when(a1) {
        0, 1 -> {
            println("a1 0 또는 1 입니다.")
        }
        2, 3 -> {
            println("a1 2 또는 3 입니다.")
        }
        else -> {
            println("모두 아닙니다.")
        }
    }

    var a2 = 55.5
    when(a2) {
        33.33 -> {
            println("a2 33.33 입니다.")
        }
        55.55 -> {
            println("a2 55.55 입니다.")
        }
        else -> {
            println("모두 아닙니다.")
        }
    }

    var a5 = "문자열1"
    when(a5) {
        "문자열1" -> {
            println("a2 문자열1 입니다.")
        }
        "문자열2" -> {
            println("a2 문자열2 입니다.")
        }
        else -> {
            println("모두 아닙니다.")
        }
    }


    var a6 = 5
    when(a6) {
        in 1..3 -> {
            println("a6 1~3 사이 숫자 입니다.")
        }
        in 4..6 -> {
            println("a6 4~6 사이 숫자 입니다.")
        }
        !in 1..6 -> {
            println("a6 1~6 사이 숫자가 아닙니다.")
        }
        else -> {
            println("모두 아닙니다.")

        }
    }


    var a7 = func1(1)
    var a8 = func1(2)
    var a9 = func1(4)

    println(a7)
    println(a8)
    println(a9)
}

fun func1(a1: Int) = when(a1) {
    1 -> {
        100
    }
    2 -> {
        200
    }
    else -> {
        -1
    }
}