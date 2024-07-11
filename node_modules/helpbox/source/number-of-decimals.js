"use strict";

/**
 * Returns the number of decimals in a given number.
 * The function also works for strings containing valid
 * numbers.
 *
 * @function numberOfDecimals
 *
 * @param number {Number|String} The number to check.
 *
 * @return {Number} A number of decimals (0 for integers).
 */
module.exports = number => {
    return ((number.toString()).split(".")[1] || []).length;
};
