// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed


// console.log(__filename)
// setTimeout(() => {
//   console.log('hello world')
// }, 2000)    

console.log(__dirname);
console.log(__filename);
console.log(process.env.MY_VAR);