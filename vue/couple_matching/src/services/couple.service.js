import ApiService from './api.service'

class CoupleApiError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

/**
    성능적으로 알고리즘 개선점

    1. [...arr1, ...arr2] 부분은 매번 새로운 배열 객체를 생성해서 또다시 새로운 객체에 병합하는 과정에서
        많은 자원을 소모하기 때문에 좋지 못하다. jsMatch에서 비교했을 때
        - 일반 for()
        - [...arr1, ...arr2]
        - arr1.concat(arr2)
        - Array.prototype.push.bind(arr1, arr2)
        를 비교해 봤을 때 Array.prototype.push.bind(arr1, arr2) 가 가장 좋은 성능을 냈다.

    2. str += "" 는 내부적으로 다시 새로운 string 객체를 생성해서 병합하는 과정을 거친다.
        1번에서 언급한 문제점이 발생하기 때문에 성능에 좋지 않다.
        str = [] 로 만들고 str[i] = "" 를 넣어준뒤 마지막에 str.join("")을 해주면 훨씬 더 좋은 성능을 낸다.

    3. tmpCache를 없앴다. 사실 이 cache의 역할은 i > j를 돌면서 그 당시 각 자리들의 매칭 최대값을 미리 저장해놓고
        if (max <= cursor) 조건을 맞지 않은 경우는 아예 저 조건의 코드과정을 밟지 않도록 하여,
        불필요한 작업들을 줄이는데 있다.

        첫 코드 자체가 tmpCache가 존재 했으나, 전혀 그럴 필요가 없다. 그냥 새로운 max값이 갱신 될때마다.
        캐쉬에 그 해당 키값의 max값만 변경시켜 주면 된다.
        굳이 밑에서 Array.prototype.push.bind(cache1, cache2) 과정을 밟아 가면서 자원을 소모할 필요가 없었다.

    4. cache 자료구조를 Map() 에서 []로 변경 시켜줬다. 성능 비교를 해보니 엄청 큰차이가 있는것은 아니지만,
        cache에 데이터를 꺼내고 사용하는데 있어서 []가 더 성능이 좋다.
        하지만, 각 item의 공간복잡도가 높을 경우 Map()을 쓰는 것이 좋을 것 같다. 바로 key값을 통해 값을 가져올 수 있기 때문이다.

    5. 배열에 대한 할당을 new Array()를 [] 리터럴 형식으로 모두 변경시켰다. (성능의 차이가 있음)
        Array.lenght 연산을 최소화 하기 하였다.

    [ 결론 ]
    - 위와 같이 구현을 했을 시 일단 약간의 개선은 있었음, 기존 코드보다 더 좋은 성능과 처리 시간을 보였음
 */

const makePerCheckedList = (list) => {
    const alphabetLen = 26;
    return list.map((e, i) => {
        let checked = new Array(alphabetLen); 

        for (let i=0; i<10; i++) {
            checked[e.charCodeAt(i)-65] = true 
        }

        return checked 
    });
}

const matchCouple = (perHobbiesList) => {
    let couples = []
    let perCheckedList = makePerCheckedList(perHobbiesList);
    let max = 0;
    let maxCache = [];

    for (let i=0, len = perHobbiesList.length; i<len; i++) {
        let tmpCouples = [];
        max = !!maxCache[i+1] ? maxCache[i+1] : 0

        for (let j= 0; j<len; j++) {
            if (i==j) continue;

            let matched = [];
            let cursor = 0;
            for (let k=0; k<10; k++) {
                if (perCheckedList[j][perHobbiesList[i].charCodeAt(k)-65] !== undefined) {
                    matched[cursor++] = perHobbiesList[i][k];
                }
            }

            if (max <= cursor) {
                if (max < cursor) tmpCouples = [];
                
                tmpCouples.push({
                    'matched': `${i+1}-${j+1}`, 
                    'left': perHobbiesList[i], 
                    'right': perHobbiesList[j],
                    'matchedStr': matched.join("")})
                    
                maxCache[j+1] = cursor;
                max = cursor
            }
        }
        
        Array.prototype.push.apply(couples, tmpCouples);
        max = 0
    }
    return couples;
}


const CoupleService = {
    callApiOfPerHobbies: async function(param) {
        let couples = [];
        try {
            
            const response = await ApiService.get(`/${param.size}`);

            let startTime = new Date().getTime();
            couples = matchCouple(response.data);
            let endTime = new Date().getTime();

            console.log("performance - " ,endTime - startTime);

            return couples;
        } catch (error) {
            throw new CoupleApiError(error.response.status, error.response.data.message)
        }
    }
}

export default CoupleService

export { CoupleService, CoupleApiError }