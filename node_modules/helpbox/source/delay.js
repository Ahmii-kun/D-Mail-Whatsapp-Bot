"use strict";

const delayed = require("./delayed");

/**
 * Calls a function after a given delay.
 *
 * @see delayed
 *
 * @function delay
 *
 * @param λ              {Function} The function to execute.
 * @param delay          {Number}   The delay, in ms.
 * @param otherArguments {...Any}   Additional arguments to pass to λ.
 *
 * @return {Promise} A promise that resolves with the return value of λ.
 */
module.exports = (λ, delay, ...otherArguments) => {
    return delayed(λ, delay)(...otherArguments);
};
