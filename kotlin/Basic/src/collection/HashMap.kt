package collection

/**
Kotlin HashMap is class of collection based on MutableMap interface.
Kotlin HashMap class implements the MutableMap interface using Hash table
 */

fun main(args: Array<String>) {

    val hashMap = hashMapOf<Int, String>()

    // put(key, value)
    hashMap.put(1, "Charles")
    hashMap.put(2, "Moony")
    hashMap.put(3, "Pho")
    hashMap.put(4, "Anton")

    // get(key) , getValue(key)
    println("get val : ${hashMap.get(2)}")
    println("get val : ${hashMap.getValue(2)}")


    // loop
    for ((k,v) in hashMap) {
        print("$k - $v ,")
    }
    for (k in hashMap.keys) {
        print("$k ,")
    }
    for (v in hashMap.values) {
        print("$v ,")
    }

    // size()
    println("hash size : ${hashMap.size}")
    // isEmpty()
    println("hash isEmpty : ${hashMap.isEmpty()}")


    // replace(key, newValue)
    hashMap.replace(3, "Chuck")
    for ((k,v) in hashMap) {
        print("$k - $v ,")
    }

    // contains(key), containsKey(3), containValue(value)
    println()
    println("contain e 4 : ${hashMap.contains(3)}")
    println("contain e 4 : ${hashMap.containsKey(3)}")
    println("contain e 4 : ${hashMap.containsValue("Anton")}")

    hashMap.remove(3)


    // HashMap<K, Obj>()
    println(" ---- HashMap<K, Obj>() ---- ")

    println()
    println(" ---- Map<K,V>() original vs sorted ---- ")
    val objMap = mapOf(Pair(2, 4), Pair(3, 14), Pair(1, 10))
    for ((k,v) in objMap) {
        print("{k: $k, v: $v, ")
    }

    println()

    val objSortedMap = objMap.toSortedMap()
    for ((k,v) in objSortedMap) {
        print("{k: $k, v: $v, ")
    }

    println()
    println(" ---- HashMap<K,V>() original vs sorted ---- ")
    /*
        Map은 단순히 입력된 순으로 정렬이 된다면, Hash 테이블은 idx기준으로 정렬이 자동으로 된다.
        그렇다면 HashMap을 정렬 시킨다면, 새로운 정렬 기준이 필요하다.

        특히 Node와 같은 객체를 기준으로 정렬을 하고자 할때
     */
    var objHashMap = hashMapOf<Int, Node>()
    objHashMap.put(2, Node(2, 4))
    objHashMap.put(3, Node(3, 14))
    objHashMap.put(1, Node(1, 10))
    objHashMap.put(4, Node(4, 2))

    for ((k,n) in objHashMap) {
        print("{k: $k, v: ${n.value}}, ")
    }

    println()
    println()
    // HashMap 자체가 자동으로 idx 기준으로 정렬되어 있기 때문에, 불필요한 작업이다.
    var objSortedHashMap = objHashMap.toSortedMap()

    for ((k,n) in objSortedHashMap) {
        print("{k: $k, v: ${n.value}}, ")
    }

    println()
    println()
    // HashMap 자체가 key를 기준으로 정렬을 한다.
    // 어째든 오늘은 여기까지만 알고 넘어가자 compare {} 안에서 커스텀 하는건 다음 기회에
    objSortedHashMap = objHashMap.toSortedMap(compareBy<Int> {
        // 커스텀을 할수 있다.
        // 뭐 문자열 같은 경우는 문자열 길이같은걸로..
        // 그 이상의 커스텀은 다음기회에
        it.compareTo(100)
    }.thenBy { it })
    for ((k,n) in objSortedHashMap) {
        print("{k: $k, v: ${n.value}}, ")
    }

    println()
    println()
    // HashMap key를 중심으로 오름차순이다
    objSortedHashMap = objHashMap.toSortedMap(compareByDescending { it })
    for ((k,n) in objSortedHashMap) {
        print("{k: $k, v: ${n.value}}, ")
    }

    // 즉!!!
    // key는 정렬의 기준이 되는 값으로 넣고
    // value의 객체가 재정렬 되도록 하자!!
    // 이러한 특징은 Heap 정렬이나, 또는 우선순위 큐에도 이용할 수 있을것이다

    // 근데 절대!! key는 불변하는 값이여만 한다.

}

class Node {
    var idx: Int
    var value: Int

    constructor(_idx: Int, _val: Int) {
        this.idx = _idx
        this.value = _val
    }
}
