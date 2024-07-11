"use strict";

const times = require("lodash.times");

const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Generates a random string containing characters in range [A-Za-z0-9]. Unsafe for crypto!
 *
 * @function makeRandomAlphanumericalString
 *
 * @param length {Number} The length of the random string to generate.
 *
 * @return {String} A string containing `length` simple pseudo-random characters.
 */
module.exports = length => {
    return times(length, () => {
        return characters[Math.floor(Math.random() * characters.length)];
    }).join("");
};
