const { createReadStream } = require('fs');

let counter = 0;
let stream = createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200
});

stream.on('data', (msg) => {
  counter++;
  console.log(msg);
  if (counter >= 10) { // stop the stream after 10 chunks
    stream.destroy();
  }
});

stream.on('end', () => {
  console.log(counter);
});

stream.on('error', (error) => {
  console.log(error);
});

// const { createReadStream } = require('fs');

// let counter = 0;
// let stream = createReadStream('../content/big.txt', 'utf8', 200);

// stream.on('data', (msg) => {
//   counter++;
//   console.log(msg);
// });
// stream.on('end', () => {
//   console.log(counter);
// });
// stream.on('error', () => {
//   console.log(error);
// });