/**
 * In JavaScript Objects and Functions very related
 * 
 * Objects can include:
 * - Primitive // 0x002 - Reside in memory address
 * - Object // 0x003
 * - Function "method" // 0x004
 */

/**
 * Objects and the dots operator
 * =============================
 * /

var person = new Object();

person['firstname'] = "Shay";
person['lastname'] = "Pinhas";

var firstNameProperty = "firstname";

console.log(person);
console.log(person["firstname"]); // Not the preferred way
console.log(person[firstNameProperty]); // Use brakets only for dynamic string

console.log(person.firstname);
console.log(person.lastname);

person.address = new Object();
person.address.street = "har bental St.";
person.address.city = "Hadera";
person.address.state = "IL";

console.log(person.address.street);
console.log(person.address.city);
console.log(person.address.state);
console.log(person["address"]["state"]);

/**
 * Objects and Object literals
 * ===========================
 * /

// var person = new Object();
// person['firstname'] = "Shay";

var person = {}; // Object literals

var person = { firstname: 'Shay', lastname: 'Pinhas' }; // In one line

function greet(person) {
    console.log('Hi ' + person.firstname);
}

greet(person);

// Create object on the fly!
greet({ firstname: 'Shay', lastname: 'Pinhas' }); // this object has no address in memory and we cant catch him

/**
 * Faking namespace
 * =================
 * - NAMESPACE - a container(holder) for variables and functions
 * - Typically to keep variables and functions with the same name separate
 * - JS not have namespace - we dont need, we do it with objects
 * /

 // PHP example
// namespace first;
// class myclass {
//     $prop1;

// }

// namespace other;
// class myclass {
//     $prop2;
    
// }

// <?


// use other\myclass;

// myclass::prop2




var greet = 'Hello!';
var greet = 'Hola!';
console.log(greet);

var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';
console.log(english.greet);

// we can do multi level of name space
// english.greeting.greet = 'Hello!'; // return Uncaught TypeError: Cannot set property 'greet' of undefined

// english.greeting = {}; // to solve this error we must declare an object for greeting
// english.greeting.greet = 'Hello!';

// console.log(english.greeting);

// // we can create it at once
var english = {
    greeting: {
        greet: 'Hello!'
    }
}

/**
 * JSON and Object Literals
 * ========================
 * - Java Script Object Notation
 * - inspired by javascript Object literal
 * /

var objectLiteral = {
    firstname: 'Mary',
    isProgrammer: true,
    age: 30
}

console.log(objectLiteral);

/**
 * XML - A format that was common on the web for API
 * - send data across the internet
 * <object>
 *  <firstname>Mary</firstname>
 *  <isProgrammer>true</isProgrammer>
 * </object>
 */

/* <myusers>
    <user>amit</user>
    <user>yossi</user>
    <user>arie</user>
</myusers> */

/**
 * - In JSON properties have to be wrapped in quotes - stricter rules
 * - In JSON, values must be one of the following data types:
 *   string, number, object (JSON object), array, boolean, null
 * - JSON values cannot be one of the following data types:
 *   function, date, undefined
 * - very easy to convert between json and object
 * {
 *   "firstname": "Mary",
 *   "isProgrammer": true
 * }
 * /

console.log(JSON.stringify(objectLiteral));
// {"firstname":"Mary","isProgrammer":true}

var jsonValue = JSON.parse('{"firstname":"Mary","isProgrammer":true}');
console.log(jsonValue);

var obj1 = {
    firstname: 'Mary',
    isProgrammer: true,
    age: 30
}

// var obj2 = JSON.parse(JSON.stringify(obj1));
// obj2.firstname = "Danielle";
// obj1 === obj2

/**
 * Functions are Object
 * ====================
 * - First class functions - Everything you can do with other types you can do with functions
 * - Assign them to variable, pass them around as parameters, create them on the fly
 * - First class functions change the way you can program 
 * 
 * Function - a special type of object
 * We can attach them Primitive, Object, Function!!! (like the object)
 * function has two things that not valid in object
 * - Name - optional, can be anonymous
 * - Code - the entire code of the function sitting on a property, its just a special property of a function!!!
 *   the CODE is INVOCABLE () - meaning run this code
 * /

function greet() {
    console.log('Hi');
}

greet.language = 'english'; // just like object because function IS object
greet.name = 'Idan'; // just like object because function IS object

console.log(greet);
console.log(greet.language);
console.log(greet.name);

var iamobject = {}; // object not has name

/**
 * Function statements and Function expression
 * ===========================================
 * - EXPRESSION: a unit of code that results in a value
 * - it doesn`t have to save to a variable
 * - STATEMENT - it doesn`t return a value
 */

// var a;
// console.log(a);
// console.log(a = 3); // equal is an operator Actully operator is a FUNCTION
// console.log(1 + 2); // I get 3 even I didn`t use = operator because its EXPRESSION

// if statement
// if (a === 3) {
//     console.log('Hi');
// }

// greet(); // - it`s hoisted

// function statement - placed into memory but it`s just a statement
// function greet() {
//     console.log('Hi');
// }

// console.log(myname);

// var myname = "shay";

// console.log(myname);

// greet5();

// var greet5 = function () {
//     console.log('Hi');
// }



// greet() // Invoked the code part of the function

// anonymousGreet() // - it`s not hoisted

// function expression - creating an object(function) ON THE FLY and assigning to anonymousGreet 
// var anonymousGreet = function () {
//     console.log('Hi');
// }

// anonymousGreet() // pointing to the address where the object lives

// function log(callback) {
//     callback();
// }

// // create function on the fly and pass it as a parameter then invoke it
// log(  function () {console.log('Hi')}  );

/**
 * BY VALUE VS BY REFERENCE
 * ========================
 * - Primitive by value
 *   var a; // reside in 0x001
 *   var b = a; // reside in 0x002 - COPY of primitive value
 * by value - copy to two seperate spots in memory
 * - Object and functions by reference
 *   var a = {}; // reside in 0x001
 *   var b = a; // JUST point to 0x001
 * by reference - two names point to the same address
 * /

// by value
var a = 3;
var b;

b = a;
a = 2;
console.log(a);
console.log(b);

// by reference
var c = { greeting: 'Hi' };
var d;

d = c;

// MUTATE: to change somthing
// "Immutable" means CANT BE changed
c.greeting = 'Hello';

console.log(c);
console.log(d);

// by reference (even as parameters)
function changeGreeting(obj) {
    obj.greeting = 'Hola'; // mutate
}

changeGreeting(d);
console.log(c);
console.log(d);

// equals operator sets up new memory space (new address)
c = { greeting: 'howdy' }; // d and see no longer pointing to the same address
console.log(c);
console.log(d);

/**
 * --------------------------------
 * --------------------------------
 */