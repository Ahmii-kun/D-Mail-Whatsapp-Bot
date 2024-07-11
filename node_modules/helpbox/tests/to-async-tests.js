"use strict";

const tester  = require("./framework");
const toAsync = require("../source/to-async");

const identity = x => x;

module.exports = tester.run([
    tester.make("toAsync() should return asynchronous versions of passed functions", async () => {
        const x = 2;

        return await toAsync(identity)(x).then(y => y === x);
    })
]);
