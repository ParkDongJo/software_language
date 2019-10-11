function findHobbyists(hobbies, hobby) {
    let answer = [];
    let idx = 0;
    for (let key in hobbies) {
        for (let i= 0, len= hobbies[key].length; i<len; i++) {
            if (hobby == hobbies[key][i]) {
                answer[idx++] = key;
                break;
            }
        }
    }
    return answer;
}
  
  var hobbies = {
    "John": ['Piano', 'Puzzles', 'Yoga'],
    "Adam": ['Drama', 'Fashion', 'Pets'],
    "Mary": ['Magic', 'Pets', 'Reading']
  };
  
  console.log(findHobbyists(hobbies, 'Yoga'));