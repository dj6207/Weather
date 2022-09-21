console.log('Hello World');

let name = 'Ok';
console.log(name);

name = 'No';
console.log(name)

const nine = '9';
console.log(nine)

const numberNine = 9;
console.log(numberNine)

console.log(typeof(nine))
console.log(typeof(numberNine))

//person object
let person = {
    name: "kevin",
    age: 9
};

console.log(person);

console.log(person.name);
person.name = 'devin';
console.log(person.name);
person['name'] = 'not devin';
console.log(person.name);

let selection = 'name';
person[selection] = 'chris';
console.log(person.name);

let array = ['red', 'black'];
array[2] = 'blue';
array[3] = 0;
array[10] = 8;
console.log(array);

function greet(name) {
    console.log('this is a fucntion ' + name);
    console.log()
}

greet('ok');