"use strict";

const tester    = require("./framework");
const factorify = require("../source/factorify");

module.exports = tester.run([
    tester.make("factorify() should transform constructors into factories", () => {
        const toSet = factorify(Set);

        return [[], [], []].map(toSet).every(set => set instanceof Set);
    })
]);
