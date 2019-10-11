function johnMary(str) {
    // Your code goes here
    const reJohn = /john/g
    const reMary = /mary/g
    let jCount = ((str.toLowerCase()).match(reJohn) || []).length
    let mCount = ((str.toLowerCase()).match(reMary) || []).length

    return jCount == mCount ? true : false;
  }
  
  console.log(johnMary("John&Mary"));
  console.log(johnMary("John&Mary&Mary"));