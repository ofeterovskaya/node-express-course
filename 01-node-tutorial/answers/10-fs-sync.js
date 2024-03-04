// const { readFileSync, writeFileSync } = require('fs')
// console.log('start')
// const first = readFileSync('./content/first.txt', 'utf8')
// const second = readFileSync('./content/second.txt', 'utf8')

// writeFileSync(
//   './content/result-sync.txt',
//   `Here is the result : ${first}, ${second}`,
//   { flag: 'a' }
// )
// console.log('done with this task')
// console.log('starting the next one')

const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("../content/first.txt", "utf8");
const second = readFileSync("../content/second.txt", "utf8");

writeFileSync(
  "./temporary/fileA.txt",
  `Here is the result: ${first}, ${second}\n`,
  { flag: "a" }
);

// Read the file and log its contents
const fileContents = readFileSync("./temporary/fileA.txt", "utf8");
console.log(fileContents);
