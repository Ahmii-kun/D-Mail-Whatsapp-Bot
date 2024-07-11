"use strict";

const tester       = require("./framework");
const sequentially = require("../source/sequentially");

module.exports = tester.run([
    tester.make("sequentially() should not execute λ in parallel", async () => {
        let busy = false;

        const λ = () => {
            if (busy) {
                return Promise.reject();
            }

            busy = true;

            return new Promise(resolve => {
                setImmediate(() => {
                    busy = false;

                    resolve(true);
                }, 0);
            });
        };

        return await (
            sequentially(λ, [0, 0, 0])
            .then(() => true)
            .catch(() => false)
        );
    }),

    tester.make("sequentially() should return the default value asynchronously if the input array is empty", async () => {
        const expected = Symbol();

        const results = sequentially(() => {}, [], expected);

        return results.then && (await results) === expected;
    })
]);
