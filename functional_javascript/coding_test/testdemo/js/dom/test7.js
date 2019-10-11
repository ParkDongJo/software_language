function generateNewFolderName(existingFolders) {
    // Write your code here
    let len = existingFolders.length
    let nameCache = new Array(len);
    let n = 1;

    for (let i=0; i<len; i++) {
        if (existingFolders[i].includes("New Folder")) {
            let idx = existingFolders[i].indexOf('(');
            if (idx !== -1) {
                nameCache[parseInt(existingFolders[i].charAt(idx+1))-1] = true;
            } else {
                nameCache[0] = true;
            }
        }
    }
    for (let i=0; i<len; i++) {
        if (nameCache[i] == undefined) break
        n++;
    }
    return n==1 ? "New Folder" : `New Folder (${n})`;
  }
  
//   console.log(generateNewFolderName(["New Folder"]));
  console.log(generateNewFolderName(["bbb","aaa","cccc"]));
//   console.log(generateNewFolderName(["New Folder","aaa","cccc","New Folder (2)"]));
  console.log(generateNewFolderName(["New Folder","New Folder (5)","New Folder (4)","New Folder (2)"]));
  console.log(generateNewFolderName(["New Folder","New Folder (3)","New Folder (4)","New Folder (2)"]));


  function generateNewFolderName(existingFolders) {
    // Write your code here
    let len = existingFolders.length
    let nameCache = new Array(len);
    let  = 1;

    for (let i=0; i<len; i++) {
        if (existingFolders[i].includes("New Folder")) {
            let idx = existingFolders[i].indexOf('(');
            if (idx !== -1) {
                parseInt(existingFolders[i].charAt(idx+1))-1;
            } else {
                nameCache[0] = true;
            }
        }
    }
    for (let i=0; i<len; i++) {
        if (nameCache[i] == undefined) break
        n++;
    }
    return n==1 ? "New Folder" : `New Folder (${n})`;
  }