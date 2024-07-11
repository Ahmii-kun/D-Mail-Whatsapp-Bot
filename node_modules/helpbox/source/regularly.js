"use strict";

const noop = require("lodash.noop");

/**
 * Returns a function that starts calling λ repeatedly with an `interval` time interval.
 * That function has a stop() method to stop the loop. To resume the loop, make another
 * call to that function.
 *
 * @function regularly
 *
 * @param λ            {Function}       The function to call repeatedly.
 * @param interval     {Number}         The repetition interval.
 * @param errorHandler {Function|Falsy} A function to call when λ throws. By default, this is a noop.
 *
 * @return {Function} λ transformed into a loop control function that returns a
                      promise resolved after the first λ run and requiring no argument.
 */
module.exports = (λ, interval, errorHandler = noop) => {
    let timeoutId  = null;
    let promise    = null;
    let stop       = false;
    let λisRunning = false;

    const pollλ = () => {
        if (λisRunning) {
            return promise;
        }

        stop       = false;
        λisRunning = true;

        clearTimeout(timeoutId);

        return Promise
        .resolve()
        .then(λ)
        .catch(errorHandler)
        .catch(noop)
        .then(() => {
            λisRunning = false;

            if (!stop) {
                timeoutId = setTimeout(pollλ, interval);
            }
        });
    };

    pollλ.stop = () => {
        stop = true;

        clearTimeout(timeoutId);
    };

    return pollλ;
};
