"use strict";

const tester = require("./framework");
const delay  = require("../source/delay");

module.exports = tester.run([
    tester.make("delay() should properly delay function calls", async () => {
        const initialValue = 2;
        const expected     = 3;
        const badValue     = 4;

        let output = initialValue;

        const λ = () => {
            output = expected;
        };

        const promise = delay(λ, 0);

        const notChangedImmediately = output === initialValue;

        output = badValue;

        await promise;

        return notChangedImmediately && expected !== badValue && output === expected;
    }),

    tester.make("delay() should resolve with the result of λ", async () => {
        const expected = 4;

        const λ = () => expected;

        return (await delay(λ, 0)) === expected;
    }),

    tester.make("delay() should properly forward additional arguments to λ", async () => {
        const expected = 4;

        const λ = (a, b) => a + b;

        return (await delay(λ, 0, expected, expected)) === 2 * expected;
    })
]);
