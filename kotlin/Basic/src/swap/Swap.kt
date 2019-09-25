package swap

fun main(arg: Array<String>) {
    var a = 1
    var b = 2

    a = b.also { b = a }

    println(a) // print 2
    println(b) // print 1
}