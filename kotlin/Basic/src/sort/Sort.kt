package sort

fun main(args: Array<String>) {
    /*
        list의 정렬 방법
     */

    val list = listOf(4, null, 1, -2, 3)

    val nullsFirstList = list.sortedWith(nullsFirst(reverseOrder()))
    println(nullsFirstList) // [null, 4, 3, 1, -2]

    val nullsLastList = list.sortedWith(nullsLast(reverseOrder()))
    println(nullsLastList) // [4, 3, 1, -2, null]


    /*
        hashMap의 정렬 방법
     */
    val hashMap = hashMapOf<Int, String>()
    hashMap.put(1, "Charles")
    hashMap.put(2, "Moony")
    hashMap.put(3, "Pho")
    hashMap.put(4, "Anton")
    val sortedHashMap = hashMap.toSortedMap(compareBy { it })
    val sortedDesHashMap = hashMap.toSortedMap(compareByDescending { it })
}