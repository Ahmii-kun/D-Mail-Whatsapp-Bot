"use strict";

let loggingFunction = console.error.bind(console);

/**
 * If `truthy` is a truthy, returns that truthy without doing anything else. If it is
 * a falsy, returns it and displays the assertion message.
 *
 * @function assert
 *
 * @param truthy  {Truthy|Falsy} The truthy to test.
 * @param message {String}       The message to display with console.error() when `truthy` is a falsy.
 *
 * @return {Any} Returns truthy.
 */
module.exports = (truthy, message) => {
    if (!truthy) {
        loggingFunction(message);
    }

    return truthy;
};

module.exports.setErrorLoggingFunction = λ => {
    loggingFunction = λ;
};

module.exports.getErrorLoggingFunction = () => {
    return loggingFunction;
};
