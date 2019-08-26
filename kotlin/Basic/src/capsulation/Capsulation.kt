package capsulation

fun main(args: Array<String>) {
    var t1 = TestClass1()

    t1.a1 = 100
    println("t1.a1 : ${t1.a1}")

    var t2 = TestClass2()
    t2.value1 = 100
    println("t2.value1 : ${t2.value1}")
}

class TestClass1 {
    var a1 = 0
}

class TestClass2 {
    private var a1 = 0

    var value1 : Int
        set(v1) {
            println("setter가 호출되었습니다.")
            this.a1 = v1
        }
        /*
        get() {
            println("getter가 호출되었습니다.")
            return this.a1
        }
         */
        get() = this.a1
}