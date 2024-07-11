"use strict";

/**
 * Returns an asynchronous version of the passed λ.
 *
 * @function toAsync
 *
 * @param λ {Function} The function to make asynchronous
 *
 * @return {Function} An asynchronous version of λ.
 */
module.exports = λ => async (...parameters) => {
    return λ(...parameters);
};
