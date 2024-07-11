"use strict";

/**
 * Calls λ repeatedly until its results satisfy `predicate`.
 *
 * @function repeatAsyncUntil
 *
 * @param λ         {Function} The function to repeat. Can be asynchronous.
 * @param predicate {Function} The predicate to check the results of λ. Can be asynchronous too.
 *
 * @return {Promise} A promise that resolves with the first return value from λ that satisfies
 *                   `predicate`.
 */
module.exports = async (λ, predicate) => {
    let value;

    do {
        value = await λ();
    } while (!(await predicate(value)));

    return value;
};
