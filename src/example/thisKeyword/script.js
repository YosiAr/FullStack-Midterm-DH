// 'use strict';

/**
 * ----------------------------------------------------------------------------------
 * ---THIS KEYWORD-------------------------------------------------------------------
 * bind, call, apply, _this----------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * https://www.slideshare.net/yinyang581525/javascript-this-keyword
 * /

 var person = {
    firstName: 'Shay',
    lastName: 'Pinhas',
    giveMeName: function () {
        console.log(this.firstName + " " + this.lastName); //We can use this
        console.log(person.firstName + " " + person.lastName); //Or person
    }
}

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * /

this.firstName = 'Sarah'; // 'this' sitting on window object
this.lastName = 'Levi';

function giveMeName() {
    console.log(this.firstName + " " + this.lastName);
}

var person = {
    firstName: 'Moshe',
    lastName: 'Cohen',
    giveMeName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

person.giveMeName();//Moshe Cohen
giveMeName(); //Sarah Levi

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * /

var person = {
    firstName: 'Moshe',
    lastName: 'Cohen',
    giveMeName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

var otherObject = {
    myMethod: function (callback) {
        callback();
    }
}

otherObject.myMethod(person.giveMeName); // undefined undefined
// who Invoked the function? -> otherObject
// otherObject doesn`t know person.firstName

this.firstName = 'Shay' // this = window - the root object
this.lastName = 'Pinhas'

otherObject.myMethod(person.giveMeName); // Shay Pinhas

otherObject.myMethod(person.giveMeName.bind(person)); // bind = invoke it from person - cos` it`s the context

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * /

var person = {
    firstName: 'Moshe',
    lastName: 'Cohen',
    giveMeName: function (title, isAdmin) {
        console.log(title + ' ' + this.firstName + " " + this.lastName + ', is Admin:' + isAdmin);
    }
}

var otherObject = {
    myMethod: function (callback) {
        callback.call(person, 'Mr.', 'Yes'); // fix the context 'call' pass arguments by commas
        callback.apply(person, ['Mr.', 'Yes']); // fix the context 'apply' pass arguments by array
    }
}

otherObject.myMethod(person.giveMeName);

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * /

var person = {
    firstName: 'Shay',
    lastName: 'Pinhas',
    moods: ['happy', 'angry', 'sad'],
    giveMeName: function () {
        var _this = this // fix the context with _this
        this.moods.forEach(function (mood) {
            console.log(_this.firstName + " " + _this.lastName + ' Can be ' + mood);
        });
    }
}

person.giveMeName();

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 * /

var rootObj = {
    prop: 'some root property',

    // rootObj._this == window.rootObj._this - if not in function
    _this: this, // window

    nestedObj: {
        _this: this, // window
        nestedObj2: {
            _this2: this, // window
        },
    },

    // rootObj.nestedFunc() - rootObj run the nestedFunc
    nestedFunc: function () {
        return this // rootObj
    },

    // rootObj.nestedFunc2 - window run the nestedFunc2
    // rootObj.nestedFunc2() return Uncaught TypeError: rootObj.nestedFunc2 is not a function
    // only function that You run return this of object
    // in strict mode return undefined
    nestedFunc2: function () {
        return this // window
    }(),

    // rootObj.nestedFunc3()() - the nested not first child of object 
    // just the first child
    // in strict mode return undefined
    nestedFunc3: function () {
        return function () {
            return this // window
        }
    },

    // rootObj.nestedFunc3()() - the nested not first child of object 
    // just the first child
    // in strict mode return undefined
    nestedFunc3_1: function () {
        var _this = this
        return function () {
            return _this // rootObj
        }
    },

    // rootObj.nestedFunc4()
    // who run it? yes rootObj
    nestedFunc4: function () {
        return function () {
            return this // rootObj
        }
    }()
}

var otherObject = {
    prop: 'other object prop'
}

rootObj.nestedFunc()

// rootObj
var neededFunc = rootObj.nestedFunc()

// neededFunc2() return window
var neededFunc2 = rootObj.nestedFunc

rootObj.nestedFunc.bind(otherObject)()
// { prop: "other object prop" }

neededFunc2.bind(otherObject)()
// { prop: "other object prop" }

neededFunc2.call(otherObject)
// { prop: "other object prop" }

neededFunc2.apply(otherObject)
// { prop: "other object prop" }

/**
 * ----------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 */


//https://www.slideshare.net/alexebogdan/java-script-closuresprototype-inheritance
//https://www.slideshare.net/yinyang581525/javascript-common-design-patterns
