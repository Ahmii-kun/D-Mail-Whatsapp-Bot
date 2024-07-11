"use strict";

/**
 * Return a version of λ that runs it after a given delay when called.
 *
 * @see delay
 *
 * @function delayed
 *
 * @param λ              {Function} The function to transform.
 * @param delay          {Number}   The delay, in ms.
 * @param otherArguments {...Any}   Additional arguments to pass to λ.
 *
 * @return {Function} A function that returns a promise that resolves with the return value of λ.
 */
module.exports = (λ, delay) => {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    resolve(await λ(...arguments));
                } catch (error) {
                    reject(error);
                }
            }, delay || 0);
        });
    };
};
