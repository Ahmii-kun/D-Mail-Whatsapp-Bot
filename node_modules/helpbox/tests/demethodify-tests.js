"use strict";

const tester      = require("./framework");
const demethodify = require("../source/demethodify");

module.exports = tester.run([
    tester.make("demethodify() should properly demethodify simple functions", () => {
        function Person(age) {
            this.age = age;
        }

        Person.prototype.returnMyAge = function () {
            return this.age;
        };

        const person          = new Person(3);
        const returnPersonAge = demethodify(Person.prototype.returnMyAge);

        return returnPersonAge(person) === 3;
    })
]);
