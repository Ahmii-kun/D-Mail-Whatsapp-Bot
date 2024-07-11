"use strict";

const tester           = require("./framework");
const repeatAsyncUntil = require("../source/regularly");

module.exports = tester.run([
    tester.make("repeatAsyncUntil() should repeat calls to λ while predicate returns false", async () => {
        let executionsCount = 0;

        const λ         = async () => ++executionsCount;
        const predicate = async () => executionsCount === 2;

        await repeatAsyncUntil(λ, predicate);

        return executionsCount === 2;
    })
]);
