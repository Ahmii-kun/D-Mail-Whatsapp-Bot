"use strict";

const numberOfDecimals = require("../source/number-of-decimals");
const tester = require("./framework");

module.exports = tester.run([
    tester.make("numberOfDecimals(1) should be 0", async () => {
        return numberOfDecimals(1) === 0
    }),

    tester.make("numberOfDecimals(1.1) should be 1", async () => {
        return numberOfDecimals(1.1) === 1
    }),

    tester.make("numberOfDecimals(1.11) should be 2", async () => {
        return numberOfDecimals(1.11) === 2
    }),

    tester.make("numberOfDecimals(9.999) should be 3", async () => {
        return numberOfDecimals(9.999) === 3
    }),

    tester.make("numberOfDecimals('9.999') works also for number in string", async () => {
        return numberOfDecimals('9.999') === 3
    })
]);
