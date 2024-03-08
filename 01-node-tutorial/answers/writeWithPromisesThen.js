const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/temp.txt", "Hi. How Are you doing? \n", { flag: "a" }) // write line 1
  .then(() => {
    console.log("Line 1 written");
    return writeFile("./temporary/temp.txt","How was your day? What made your smile today?\n", { flag: "a" }); // write line 2
  })
  .then(() => {
    console.log("Line 2 written");
    return writeFile("./temporary/temp.txt","See you in a couple of days. \n",{ flag: "a" }); // write line 3
  })
  .then(() => {
    console.log("Line 3 written");
    return readFile("./temporary/temp.txt", "utf8"); // read the file
  })
  //receives the contents of the file (the data) as an argument.
  //then logs a message to the console to indicate that the file has been read, and logs the contents of the file.
  .then((data) => {
    console.log("File read");
    console.log(data); // log the data to the screen
  })
  .catch((err) => {
    console.log("An error occurred: ", err);
  }); 
