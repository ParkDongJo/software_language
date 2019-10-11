function changeDateFormat(dates) {
    // Write the code that goes here
    let separators = '/|-';
    let tmp;
    let year, month, day;
    let answer = [];
    let idx = 0;

    let pattern1 = /(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])/; // 2010/03/30
    let pattern2 = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}/; // 15/12/2016
    let pattern3 = /(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-(19|20)\d{2}/;   // 11-15-2012


    dates.forEach(date => {
        // date = new Date(e);
        if (date.indexOf('/') == -1 && date.indexOf('-') == -1) return;
        if (!pattern1.test(date) && !pattern2.test(date) && !pattern3.test(date)) return;



        tmp = date.split(new RegExp(separators, 'g'));
        // 패턴 체크에서 아래와 같은 부분은 걸러지기 때문에 굳이 성능저하만 가져오는 코드
                    // .map((e) => { 
                    //     if (e.length < 2) e = '0' + e;
                    //     return e;
                    // });



        if (tmp[2].length > 2) {
            if (date.indexOf('/') !== -1) {
                year = tmp[2] 
                month = tmp[1];
                day = tmp[0];
            } 
            if (date.indexOf('-') !== -1) {
                year = tmp[2] 
                month = tmp[0];
                day = tmp[1];
            }
        } else {
            year = tmp[0] 
            month = tmp[1];
            day = tmp[2];
        }

        answer[idx++] = [year,month,day].join("");
    })
    return answer;
}


function changeDateFormat2(dates) {
    // Write the code that goes here
    let separators = '/|-';
    let tmp;
    let answer = [];
    let idx = 0;

    let pattern1 = /(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])/; // 2010/03/30
    let pattern2 = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}/; // 15/12/2016
    let pattern3 = /(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-(19|20)\d{2}/;   // 11-15-2012


    dates.forEach(date => {
        // date = new Date(e);
        if (date.indexOf('/') == -1 && date.indexOf('-') == -1) return;
        if (!pattern1.test(date) && !pattern2.test(date) && !pattern3.test(date)) return;


        tmp = date.split(new RegExp(separators, 'g'))
                .sort((a,b) => {
                    if (a.length == b.length) {
                        if (pattern2.test(date)) return -1;
                        return 0;
                    } else {
                        return b.length - a.length
                    }
                })

        answer[idx++] = tmp.join("");
    })
    return answer;
}

var dates = changeDateFormat2(["2010/03/30", "15/12/2016", "11-15-2012", "20130720", "2013$07$20"]);
for (index = 0; index < dates.length; ++index) {
    console.log(dates[index]);
}



