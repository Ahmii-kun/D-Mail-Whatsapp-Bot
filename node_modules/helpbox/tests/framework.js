"use strict";

const makeTest = (name, λ) => [name, λ];

const runTests = async tests => {
    let errors = [];

    for (const [name, λ] of tests) {
        try {
            const result = await λ();

            if (!result) {
                errors.push(`${name} (${result})`);
            }
        } catch (error) {
            errors.push(`${name} (${error})`);
        }
    }

    return errors;
};

module.exports = {
    run:  runTests,
    make: makeTest
};
