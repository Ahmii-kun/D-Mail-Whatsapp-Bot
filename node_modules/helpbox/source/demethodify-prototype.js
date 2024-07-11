const curriedDemethodify = require("./curried-demethodify");

/**
 * Takes a prototype, a `definition` object and defines all prototype methods
 * as curried instance-last functions on the definition object. The prototype
 * method must follow the rules of `curriedDemethodify`.
 *
 * @function demethodifyPrototype
 *
 * @see curriedDemethodify
 *
 * @param prototype  {Object} An object containing all the methods.
 * @param definition {Object} (Optional) The object on which the functions will be defined. Defaults to `{}`.
 *
 * @return {Object} The transformed definition object.
 */
module.exports = (prototype, definition = {}) => {
    Object
    .entries(Object.getOwnPropertyDescriptors(prototype))
    .filter(([name, descriptor]) => name !== "constructor" && typeof descriptor.value === "function")
    .map(([name, descriptor]) => [name, descriptor.value])
    .forEach(([methodName, method]) => {
        definition[methodName] = curriedDemethodify(methodName, method);
    });

    return definition;
};
