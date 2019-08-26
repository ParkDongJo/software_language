package loop

fun main(args: Array<String>) {

    // 배열을 처음부터 끝까지 순회할때
    var arr1: IntRange = 1..10

    for(item in arr1) {
        print("item : $item / ")
    }

    println("------")

    for((idx, item) in arr1.withIndex()) {
        print("item $idx : $item / ")
    }

    println("------")

    // 조건을 만족할 때 까지 반복할 떄
    var a2: Int = 0
    while(a2 < 10) {
        println("a2 : $a2")
        a2++
    }

    println("------")

    var a3 = 10
    do {
        println("a3 : $a3")
        a3++
    } while (a3 < 10)



    // Prints 0 through 10 (inclusive)
    for (x in 0..10) println(x)

    // Prints 0 through 9
    for (x in 0 until 10) println(x)

    // Prints 0, 2, 4, 6, 8
    for (x in 0 until 10 step 2) println(x)

    // Prints 10, 8, 6, 4, 2, 0
    for (x in 10 downTo 0 step 2) println(x)
}