import ApiService from './api.service'

class CoupleApiError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const makePerCheckedList = (list) => {
    const alphabetLen = 26;
    return list.map((e, i) => {
        let checked = new Array(alphabetLen).fill(false); 

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
    let len = perHobbiesList.length;
    let maxCache = new Map();

    for (let i=0; i<len; i++) {
        let tmpCouples = [];
        let tmpCache = new Map();
        max = maxCache.has(`${i+1}`) ? maxCache[`${i+1}`] : 0

        for (let j= 0; j<len; j++) {
            if (i==j) continue;

            let matchedStr = '';
            for (let k=0; k<10; k++) {
                if (perCheckedList[j][perHobbiesList[i].charCodeAt(k)-65]) {
                    matchedStr += perHobbiesList[i][k];
                }
            }

            if (max <= matchedStr.length) {
                if (max < matchedStr.length) { 
                    tmpCouples = [];
                    tmpCache.clear();
                }
                
                tmpCouples.push({
                    'matched': `${i+1}-${j+1}`, 
                    'left': perHobbiesList[i], 
                    'right': perHobbiesList[j],
                    'matchedStr': matchedStr})
                    
                tmpCache.set(`${j+1}`, matchedStr.length);
                max = matchedStr.length
            }
        }
        
        couples = [...couples, ...tmpCouples]
        maxCache = new Map([...maxCache, ...tmpCache]) 
        max = 0
    }

    return couples;
}

const CoupleService = {
    callApiOfPerHobbies: async function(param) {
        let couples = [];
        try {
            const response = await ApiService.get(`/${param.size}`);
            couples = matchCouple(response.data);

            return couples;
        } catch (error) {
            throw new CoupleApiError(error.response.status, error.response.data.message)
        }
    }
}

export default CoupleService

export { CoupleService, CoupleApiError }