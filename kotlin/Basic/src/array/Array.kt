package array

fun main(args: Array<String>) {

    /**
     * 코틀린의 배열은 객체로 생성한다
     * 초기화 방법은 두가지가 있다.
     *
     * - arrayOf()로 초기화
     * - Array()로 사이즈 지정
     * - IntArray()로 사이즈 지정
     */
    var array1 = arrayOf(10, 20, 30, 40, 50)
    println("array1[0] : ${array1[0]}")

    for (value in array1) {
        print("$value , ")
    }

    println("")

    var array2 = Array(5, {i -> i.toString()})
    array2.forEach { print(it) }

    println("")

    var array3 = Array(5, {i -> i * 2})
    for (value in array3) {
        print("$value , ")
    }


    //원시 타입의 Array 생성을 지원한다
    //ByteArray, ShortArray, IntArray 등등이 있다.
    // [0, 0, 0, 0, 0]
    val arr = IntArray(5)
    // [42, 42, 4å2, 42, 42]
    val arr1 = IntArray(5, { 42 })
    // [0, 1, 2, 3, 4] (values initialised to their index value)
    var arr2 = IntArray(5, { it * 1 })
    var arr3 = intArrayOf(4,5,6,7,8)

    /**
     * 배열 객체에서 제공되는
     * 몇가지 메서드가 있다
     * - size
     * - get, set
     * - copyOf
     * - copyOfRange
     * - sortedArray
     * - reverseArray
     */
    println("array1.size : ${array1.size}")


    println("array1[0] : ${array1[0]}")
    println("array1[0] : ${array1.get(0)}")


    array1[0] = 100
    array1.set(1, 200)
    println("array1[0] : ${array1[0]}")
    println("array1[1] : ${array1.get(1)}")


    var array4 = array1.copyOf()
    array4.forEach { print("$it ,")}

    println("")

    var array5 = array1.copyOf(3)
    array5.forEach { print("$it ,")}

    println("")

    var array6 = array1.copyOfRange(1, 4) //1 부터 4-1까지
    array6.forEach { print("$it ,")}

    println("")

    var array7 = arrayOf(60 , 70, 20, 30, 10)
    var array8 = array7.sortedArray()
    array8.forEach { print("$it , ")}

    println("")

    var array9 = array8.reversedArray()
    array9.forEach { print("$it , ")}

    println("")
}