"use strict";

/**
 * Deletes null/false/undefined values from the passed object.
 *
 * @function compact
 *
 * @param object {Object} The object to compact in-place.
 *
 * @return {Object} The modified `object`, for convenience
 */
module.exports = object => {
    const keys = Object.keys(object);

    for (let it = 0; it < keys.length; it++) {
        const key   = keys[it];
        const value = object[key];

        if (value === false || value === undefined || value === null) {
            delete object[key];
        }
    }

    return object;
};
