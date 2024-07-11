/**
 * Executes an async λ over inputArray sequentially instead of concurrently.
 *
 * @function sequentially
 *
 * @example
 * const { sequentially } = require("helpbox");
 *
 * const users = ["Alex", "Georges", "Fred"];
 *
 * const createUser = user => {
 *     return (await User.persist(user)).id;
 * }
 *
 * // Will contain Fred's ID.
 * const lastUserId = sequentially(createUser, users);
 *
 * @param λ                  {Function} The async function to execute sequentially.
 * @param inputArray         {Array}    The array on which λ gets executed.
 * @param defaultReturnValue {Any}      (Optional) If the inputArray, the returned promise will hold that value.
 *
 * @return {Promise} A promise that's fullfilled when the inputArray element is processed.
 */
module.exports = async (λ, inputArray, defaultReturnValue) => {
    return inputArray.reduce((promise, element, i, collection) => {
        return promise.then(() => {
            return λ(element, i, collection);
        });
    }, Promise.resolve(defaultReturnValue));
};
