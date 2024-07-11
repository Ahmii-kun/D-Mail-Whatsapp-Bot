"use strict";

const tester  = require("./framework");
const compact = require("../source/compact");

module.exports = tester.run([
    tester.make("compact() should remove false/undefined/null values from objects in-place", () => {
        let object = { a: 0, b: 1, c: 2, d: undefined, e: null };

        return Object.keys(compact(object)).join("") === "abc";
    })
]);
