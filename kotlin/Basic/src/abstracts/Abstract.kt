package abstracts

fun main(args: Array<String>) {
//    var s1 = Super1() // 추상클래스는 생성 불가
    var s1 = Sub1()
    s1.method1()
    s1.method2()
}

/**
 * 추상 클래스는 반드시 상속을 받는 자식 클래스가 존재해야한다
 *
 * 추상 클래스의 목적은 상속을 통해 메서드 overriding에 대한
 * 강제성을 부여하기 위함에 있다.
 */
open abstract class Super1 {
    fun method1() {
        println("Super1의 method1 입니다.")
    }

    open abstract fun method2()
}

class Sub1: Super1() {

    override fun method2() {
        println("Sub1의 method2 입니다.")
    }
}