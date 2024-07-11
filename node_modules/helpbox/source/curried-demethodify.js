/**
 * Takes a `method` as input and transforms it into a curried function taking an instance
 * as its last parameter.
 *
 * @function curriedDemethodify
 *
 * @see demethodify
 *
 * @example
 * const { curriedDemethodify } = require("helpbox");
 *
 * function Person(age) {
 *     this.age = age;
 * }
 *
 * Person.prototype.ageInNYears = function (n) {
 *     return n + this.age;
 * }
 *
 * const ageInNYears = curriedDemethodify(Person.prototype.ageInNYears);
 * const person      = new Person(3);
 *
 * const ageIn10Years = ageInNYears(10);
 *
 * // Prints 13.
 * console.log(ageIn10Years(person));
 *
 * @param methodName {String}   The name of the method on the prototype.
 * @param method     {Function} The method to demethodify. It must have no rest parameters
 *                              and all arguments must be named. The arguments cannot have
 *                              default values.
 *
 * @return {Function} The demethodified function
 */
module.exports = (methodName, method) => {
    const staticVersionArity = method.length + 1;

    const recurry = (...parameters) => {
        if (parameters.length < staticVersionArity) {
            return (...additionalParameters) => {
                return recurry(...parameters.concat(additionalParameters));
            };
        }

        const instance = parameters[staticVersionArity - 1];

        parameters.splice(staticVersionArity - 1, 1);

        return (instance[methodName] || method).call(instance, ...parameters);
    };

    return recurry;
};
