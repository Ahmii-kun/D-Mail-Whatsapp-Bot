"use strict";

/**
 * Creates a version of λ that cannot be called concurrently.
 *
 * @function noConcurrentCalls
 *
 * @param λ {Function} The function to transform.
 *
 * @return {Function} A version of λ that cannot be called in parallel. If a call is performed
 *                    while the other one is not done, it returns a promise that resolves with
 *                    the results of λ when the first call finishes.
 */
module.exports = λ => {
    let locked  = false;
    let promise = null;

    return async () => {
        if (locked) {
            return promise;
        }

        locked = true;

        try {
            const results = await λ();

            locked = false;

            return results;
        } catch (error) {
            locked = false;

            return Promise.reject(error);
        }
    };
};
