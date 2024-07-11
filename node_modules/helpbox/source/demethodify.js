"use strict";

/**
 * Takes a method and transforms it into a function by binding this to the first argument
 * passed to the resulting function.
 *
 * `this` gets bound to null when the method is called.
 *
 * @see methodify
 *
 * @function demethodify
 *
 * @example
 * const { demethodify } = require("helpbox");
 *
 * function Person(age) {
 *     this.age = age;
 * }
 *
 * Person.prototype.tellMyAge = function () {
 *     console.log(this.age);
 * }
 *
 * const person        = new Person(3);
 * const tellPersonAge = demethodify(Person.prototype.tellMyAge);
 *
 * // Prints 3.
 * tellPersonAge(person);
 *
 * @param λ {Function} The function to demethodify.
 *
 * @return {Function} The function in its demethodified form.
 */
module.exports = λ => {
    return function () {
        return λ.apply(arguments[0], Array.prototype.slice.call(arguments, 1));
    };
};
