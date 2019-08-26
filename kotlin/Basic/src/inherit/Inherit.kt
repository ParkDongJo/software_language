package inherit

fun main(args: Array<String>) {
    var s1 = Sub1()
    println("s1.sub_method : ${s1.sub_method()}")
    s1.sub_method()

    println("s1.super_member : ${s1.super_member}")
    s1.super_method()

    var s2 = Sub2()
    println("s2.a1 : ${s2.a1}")
    var s3 = Sub2(500)
    println("s3.a1 : ${s3.a1}")

}

// open이라는 키워드를 붙여줘야
// 상속이 가능한 클래스로 등록됨
open class Super1{
    var super_member = 100

    fun super_method() {
        println("Super1의 메서드 입니다")
    }
}

class Sub1: Super1 {
    var sub_member = 200

    // 부모클래스의 생성자를 호출하는 부분 (필수)
    constructor() : super()

    fun sub_method() {
        println("Sub1의 메서드 입니다")
    }
}

open class Super2 constructor(a1: Int) {
    var a1 = a1
}

class Sub2: Super2 {

    constructor() : super(100)
    constructor(a1: Int) : super(a1)
}