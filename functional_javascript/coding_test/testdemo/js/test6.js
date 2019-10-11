function startStopwatch(callback, interval) {
    // Write the code that goes here
    let count = 0;
    let handler;

    handler = setInterval(function() {
        count++; 
        let isContinue = callback(count)
        if (!isContinue) clearInterval(handler);
    }, interval);
  }
  
  function callback(counter) {
    return counter < 5;
  }
  
  // Expected: 1, 2, 3, 4, 5 with 50ms interval.
  startStopwatch(callback, 1000);
  startStopwatch(callback, 1000);
  startStopwatch(callback, 50);
