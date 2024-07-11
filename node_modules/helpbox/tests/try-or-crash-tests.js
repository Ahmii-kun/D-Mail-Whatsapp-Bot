"use strict";

const tester     = require("./framework");
const tryOrCrash = require("../source/try-or-crash");

const crashException = new Error("crashed");

const identity = x => x;

const crash = () => {
    throw crashException;
};

module.exports = tester.run([
    tester.make("tryOrCrash() should crash if λ throws", () => {
        let crashed = false;

        const setCrashed = () => crashed = true;

        tryOrCrash(crash, null, false, setCrashed);

        return crashed === true;
    }),

    tester.make("tryOrCrash() should not crash if λ does not throw", () => {
        let crashed = false;

        const setCrashed = () => crashed = true;

        tryOrCrash(identity, null, false, setCrashed);

        return crashed === false;
    }),

    tester.make("tryOrCrash() should return λ's return value if λ does not throw", () => {
        const value = 1;

        return tryOrCrash(identity.bind(null, value), null, false, identity) === value;
    }),
]);
