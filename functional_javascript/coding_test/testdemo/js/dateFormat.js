function formatDate(userDate) {
    // format from M/D/YYYY to YYYYMMDD
    let date = new Date(userDate);

    let year = date.getFullYear();
    let month = '' + (date.getMonth()+1);
    let day = '' + date.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year,month,day].join("");
  }
  
//   console.log(formatDate("12/31/2014"));
  console.log(formatDate("12/01/2014"));