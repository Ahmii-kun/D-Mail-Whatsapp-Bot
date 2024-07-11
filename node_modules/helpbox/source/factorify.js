"use strict";

/**
 * Takes a constructor and returns a function that constructs new objects with that
 * constructor, forwarding its arguments to the constructor,
 *
 * @param constructor {Function} The constructory to factorify
 *
 * @return {Function} A factory function that constructs object with the passed constructor,
 */
module.exports = Constructor => function () {
    return new Constructor(...arguments);
};
