package data_type


/*
    코틀린 자료형은 앞글자가 대문자
    Double 64bit
    Float 32bit
    Long 64bit
    Int 32bit
    Short 16bit
    Byte 8bit


    리터럴
    - 코드의 값을 표현하는 문법
    정수 : 100, 100L, 1_000_000_000
    실수 : 11.11, 11.11F
    문자열 : "문자열"
    문자 : 'a'
 */

fun main(args: Array<String>) {
    println("정수 : ${100}")
    println("정수 Long : ${100L}")
    println("실수 : ${55.55}")
    println("실수 Float : ${55.55f}")
    println(1000000000)
    println(1000_000_000) //문자열이 아니라 정수입니다.

    println("문자열 입니다.")
    println('a')

    /*
        var 변수명 = 값
        최초에 넣어주는 값에 따라 자료형이 자동으로 결정된다.

        또는
        var 변수명 : 타입
     */
    var num = 100
    var text = "안녕하세요"
    println("num $num")
    // num = 100.0 // 오류 발생

    var score : Int
    score = 100
    println(score)

    var mention : String
    mention = "입니다"

    println("이번 점수는 $score $mention")


    /*
        상수 개념
        - 자바에서 final 역할을 한다고 보면됨
        - 읽기 전용 변수
        val 변수명 = 값 // 이후 값설정 불가

     */

    val constant = 400
    // constant = 100 // 오류 발생

}