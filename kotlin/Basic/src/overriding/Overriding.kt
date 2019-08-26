package overriding

fun main(args: Array<String>) {

    var s1 = Sub1()
    s1.method1()
    s1.method2()

    var s2 : Super1 = Sub1()
//    s2.method2() // 접근 불가
    s2.method1()

    testFunction(s1)
}

open class Super1 {
    open fun method1() {
        println("Super1의 메서드1 입니다.")
    }
}

class Sub1: Super1 {

    constructor(): super()

    fun method2() {
        println("Sub1의 메서드2 입니다.")
    }

    override fun method1() {
        println("Sub1의 메서드1 입니다")
    }
}

/*
    부모 클래스의 메서드를 자식 클래스에서 재구현하는 것을
    overriding이라고 부른다.
    부모 클래스의 메서드를 재 정의할 때 사용한다.

    overriding의 목적은 부모 클래스형 참조변수를 통해
    메서드를 호출할 때 자식 클래스에서 메서드를 재 구현하였다면,
    부모 클래스 타입 참조변수를 통해 자식 클래스에
    overriding 메서드를 호출하기 위함이다.
 */
fun testFunction(a1: Super1) {
    a1.method1()

}