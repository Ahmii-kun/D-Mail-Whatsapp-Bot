"use strict";

const tester               = require("./framework");
const demethodifyPrototype = require("../source/demethodify-prototype");

module.exports = tester.run([
    tester.make("demethodifyPrototype() should add curried static versions of class methods taking instances as their last argument on the passed constructor", () => {
        class Person {
            constructor(age) {
                this.age = age;
            }

            ageInNYears(n) {
                return this.age + n;
            }
        }

        demethodifyPrototype(Person.prototype, Person);

        const person = new Person(3);

        const ageIn10Years = Person.ageInNYears(10);

        return ageIn10Years(person) === 10 + 3;
    })
]);
