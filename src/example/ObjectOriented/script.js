/**
 * OBJECT ORIENTED JAVASCRIPT AND PROTOTYPAL INHERITANCE
 * =====================================================
 */

/**
 * CLASSICAL VS PROTOTYPAL INHERITANCE
 * -----------------------------------
 * INHERITANCE - one object gets access to the properties and methods of another object
 * - CLASSICAL - use classes, public, private, interface | C#, java, PHP
 * - PROTOTYPAL - simple, flexible, extensible, easy
 */

/**
 * UNDERSTANDING THE PROTOTYPE
 * obj.prop1
 * prototype - hidden functions and properties every object has proto {}
 * obj.__proto__.prop2 // obj.prop2 - if doesn`t find prop2 in obj it look at __proto__
 * obj.__proto__.__proto__.prop3 // obj.prop3 - if doesn`t find prop3 in obj it look at:
 * __proto__ then at __proto__.__proto__ etc.
 * 
 * it`s call a PROTOTYPE CHAIN
 * I dont have to go obj.proto.proto.prop3, i can just say obj.prop3
 * 
 * obj2 - can point to obj1 prototype as its prototype
 * obj2.__proto__ = obj1.__proto__ SO obj2.prop2 valid
 * /

var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function () {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe',
}


// person.getFullName.bind(john)()

// dont do this EVER! for demo purposes only!!!
john.__proto__ = person;
console.log(person);
console.log(john);
console.log(john.firstname); // prototype chain first look at john and it stop the first time it found
console.log(john.getFullName());

var jane = {
    firstname: 'Jane'
}

jane.__proto__ = person;
console.log(jane.getFullName()); // What will be the lastname?

/**
 * EVERYTHING IS AN OBJECT OR A PRIMITIVE
 * ======================================
 * everything in javascript that isn`t a primitive like number, string, boolean...
 * such as functions, arrays, basic object - they all have a prototype
 * except of BASE OBJECT
 * /

var a = {};
var b = function (){};
var c = [];

// TRY THESE IN THE CONSOLOE OF CHROME
// -----------------------------------
// a.__proto__
// a.__proto__.toString
// a.__proto__.hasOwnProperty
// a.__proto__.__proto__ // null

// b.__proto__
// b.__proto__.toString
// b.__proto__.bind
// b.__proto__.__proto__
// b.__proto__.__proto__.__proto__

// c.__proto__ // javascript sets the prototype automatically because that you can use push
// c.__proto__.push
// c.__proto__.__proto__ // return BASE Object
// c.__proto__.__proto__.__proto__ // return Null

/**
 * REFLECTION AND EXTEND
 * =====================
 * Reflection - an object can look at itself, listing and change its properties and methods
 * such as functions, arrays, basic object - they all have a prototype
 * except of BASE OBJECT
 * /

var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function () {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe',
}

john.__proto__ = person;

for (var prop in john) {
    console.log(prop + ': ' + john[prop]);
}

for (var prop in john) {
    if (john.hasOwnProperty(prop)) { // Reflect - look at it`s property
        console.log(prop + ': ' + john[prop]);
    }
}

var jane = {
    address: '111 Main St.',
    getFormalFullName: function () {
        return this.lastname + ', ' + this.firstname;
    }
}

var jim = {
    getFirstName: function () {
        return this.firstname;
    }
}

// IF I DON`T WANT TO USE THE PROTOTYPE CHAIN!
// its take all properties and methods and add them 
// directly to john object for me, NOT TO __proto__
_.extend(john, jane, jim); // from underscore library

// console.log(john);

/**
 * --------------------------------
 * --------------------------------
 */