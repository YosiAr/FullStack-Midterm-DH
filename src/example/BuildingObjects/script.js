/**
 * BUILDING OBJECTS
 * ================
 */

/**
 * function constructors, 'new', and the history of javascript
 * - built by Brandon Eich
 * - Programming language wars between Netscape, Microsoft, Oracle, Sun etc.
 * - Purpose for browser events
 * - named javascript to attract Java developers, there were a lot Java developers
 * - var john = new Person(); // one of the element for marketing javascript
 * - Java developers said: See! Javascript is like Java! You should use it! :)
 * /

// FUNCTION CONSTRUCTOR
function Person() {

    console.log(this);
    this.firstname = 'John';
    this.lastname = 'Doe';
    console.log('This function is invoked.');

    // return {greeting: 'I got in the way'};
}

console.log(Person);

// Just a different way to construct object!!! not change the core concepts
var john = new Person; // new is actually an operator
console.log(john);

var jane = {
    firstname: 'Jane',
    lastname: 'Doe'
}

console.log(jane);

/**
 * NEW - when we use new keyword:
 * 1. var a = {}; // an empty object is created
 * 2. It invokes the function
 * 3. In a special way - this point to the new empty object that created just now
 * 4. this become properties of the new object
 * 5. the new object is return, NOT the results of Person function unless if I use return in the function
 * /

var jane = new Person;
console.log(jane); // why we get John instead of Jane

function Person2(firstname, lastname) {
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This Person2 is invoked.');
}

var john2 = new Person2('John', 'Doe');
console.log(john2);
var jane2 = new Person2('Jane', 'Doe');
console.log(jane2);

/**
 * FUNCTION CONSTRUCTOR: a normal function that is used to construct objects.
 * The 'this' variable points a new empty object, and that object is returnd
 *  from the function automatically
 * /////////////////////////////////////////////////////////////////////////
 */

/**
 * FUNCTION CONSTRUCTOR AND THE '.PROTOTYPE'
 * - every function has NAME, CODE as we see before
 * - one more property like NAME, CODE is a PROTOTYPE
 * - PROTOTYPE - used only by new operator
 * - THIS IS NOT the prototype of the FUNCTION
 * - THIS IS prototype of the object that created from this function constructor
 * /

function Person(firstname, lastname) {
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    this.getFormalFullName = function () {
        return this.lastname + ', ' + this.firstname;
    }
    console.log('This Person is invoked.');
}

Person.prototype.getFullName = function () {
    return this.firstname + ' ' + this.lastname;
}

var john = new Person('John', 'Doe');
console.log(john);
console.log(john.getFullName());
console.log(john.getFormalFullName());
var jane = new Person('Jane', 'Doe');
console.log(jane);

console.log(jane === john); // true
console.log(jane.__proto__ === john.__proto__); // true

// if I created even 1000 objects, they all use the same getFullName method !!!

/**
 * DANGREROUS ASIDE 'NEW' AND FUNCTIONS
 * ====================================
 * - function constructors they still just a function
 * - if I forgot to put 'new' keyword javascript will not tell me that
 * - var john = Person('John', 'Doe');
 * - and execute the function without return from the function
 * - the default of return is undefined and that`s way john will be undefined
 * - always use capital letter it's remind you to add new keyword
 */

/**
 * BUILT-IN FUNCTION CONSTRUCTORS
 * ==============================
 * - function contructors that ready for use out of the box
 * - It look like primitive but it actually creating objects that contain primitives
 *   and give them extra abilities
 * /

var a = new Number(3);
console.log(a);

// Try in console a. to get methods of number constructor
console.log(a.toFixed(2)); // Convert a number into a string, keeping only two decimals

var b = new String('John');
console.log(b);
console.log(b.toString());
console.log(b.toUpperCase());

// String.prototype

// INDEXOF - very usefull command
console.log(b.indexOf('o'), b.indexOf('J'), b.indexOf('j'));

console.log("John".length); // js automatically wrap string as object to give you the abilities
// console.log(3m.toPrecision()); // this will not work on a number unless if it bound to variable
var m = 3;
console.log(m.toPrecision(2)); // Format a number into a specified length

var c = new Date('10/15/2017');
console.log(c);
console.log(c.getFullYear());

// Add abilities to built-in objects
String.prototype.isLengthGreaterThan = function (limit) {
    return this.length > limit;
}

console.log(b.isLengthGreaterThan(2));

/**
 * DANGREROUS ASIDE BUILT-IN FUNCTION CONSTRUCTORS
 * ===============================================
 * /

var a = 3;
var b = new Number(3);
console.log(a == b);
console.log(a === b);

console.log(a);
console.log(b);
var c = "3";
var d = Number(c); // use as Converter string to number
console.log(c);
console.log(d);

// momentjs.com

/**
 * DANGREROUS ASIDE ARRAYS AND FOR IN
 * ===================================
 * - array ARE objects
 * /

Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Jim'];

for (var prop in arr) {
    console.log(prop + ': ' + arr[prop]);
}

// In case of array DONT use for in! use standart loop
for (var i = 0; i < arr.length; i++) {
    console.log(i + ': ' + arr[i]);
}

/**
 * OBJECT CREATE AND PURE PROTOTYPAL INHERITENCE
 * =============================================
 * - array ARE objects
 */