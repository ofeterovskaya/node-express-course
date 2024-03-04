//Modules

const names = require('./04-names');
const sayHi = require('./05-utils');
const someOne = require('./06-alternative-flavor');
require('./07-mind-grenade');

// sayHi('susan')
// sayHi(names.john)
// sayHi(names.peter)
//console.log(data);

sayHi(names);
sayHi(names.zoe);
sayHi(names.klara);
console.log(names);
console.log(names.nick);

