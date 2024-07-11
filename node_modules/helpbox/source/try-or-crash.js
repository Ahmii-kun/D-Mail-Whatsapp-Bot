"use strict";

/**
 * Tries executing λ. If it throws, calls `crashFunction` and prints messages.
 *
 * @function tryOrCrash
 *
 * @param λ              {Function}     The function to execute.
 * @param errorMessage   {String|Falsy} The message to print on error.
 * @param printException {Booly}        Whether or not we should print the exception when λ throws.
 * @param crashFunction  {Function}     A function to call when λ throws. Gets passed 1 as its sole
 *                                      argument. By default, this calls NodeJS' process.exit(1).
 *
 * @return {Void}
 */
module.exports = (λ, errorMessage = null, printException = false, crashFunction = process.exit.bind(process)) => {
    try {
        return λ();
    } catch (error) {
        if (errorMessage) {
            console.error(errorMessage);
        }

        if (printException) {
            console.error(error);
        }

        crashFunction(1);
    }
};
