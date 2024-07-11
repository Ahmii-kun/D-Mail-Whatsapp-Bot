"use strict";

const flow    = require("lodash.flow");
const deburr  = require("lodash.deburr");
const toLower = require("lodash.tolower");

const looseMatchTransform = flow(deburr, toLower);

/**
 * Function that returns true when `needle` is found in `haystack`.
 * The main advantages of this function are that it removes accented characters and that
 * it is case-insensitive.
 *
 * Powered by lodash's {@link https://lodash.com/docs/#deburr deburr}.
 *
 * @function looselyMatches
 *
 * @param haystack {String} The string to inspect.
 * @param needle   {String} The substring to look for.
 *
 * @return {Boolean} True when variations of `needle` can be found inside `haystack`.
 */
module.exports = (haystack, needle) => {
    return looseMatchTransform(haystack).indexOf(looseMatchTransform(needle)) !== -1;
};
