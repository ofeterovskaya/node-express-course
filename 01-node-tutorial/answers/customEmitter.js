// Import the events module
const EventEmitter = require('events');

// Create a new EventEmitter instance
const emitter = new EventEmitter();

// Set up an event handler for the 'greet' event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Set up an event handler for the 'farewell' event
emitter.on('farewell', (name) => {
  console.log(`Goodbye, ${name}!`);
});

// Emit the 'greet' event
emitter.emit('greet', 'Mary');

// Emit the 'farewell' event
emitter.emit('farewell', 'Bob');


// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// emitter.on('hello', () => {
//   console.log('Hello there');
// });

// setInterval(() => {
//   emitter.emit('timer', 'Where have you been today?');
// }, 2000);

// emitter.emit('hello');
// emitter.on('timer', (msg) => console.log(msg));

