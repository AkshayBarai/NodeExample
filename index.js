const {addition ,No} = require ('./fistFile')
const { c , d} = require ('./secFile')
//console.log(addition(7,8));
console.log(addition(c , d));
console.log(No);

//Destructuring
let number = {a : 1 , b : 3}
// let a = number.a;
// let b = number.b;
let {a ,b } = number;
console.log(a , b) ;