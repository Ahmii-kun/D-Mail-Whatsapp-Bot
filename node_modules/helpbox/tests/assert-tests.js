"use strict";

const tester = require("./framework");
const assert = require("../source/assert");

const callAssert = (truthy, message, test) => {
    const regularLoggingFunction = assert.getErrorLoggingFunction();

    let called     = false;
    let calledWith = undefined;

    assert.setErrorLoggingFunction(message => {
        called     = true;
        calledWith = message;
    });

    const returnValue = assert(truthy, message);

    assert.setErrorLoggingFunction(regularLoggingFunction);

    return test(returnValue, called, calledWith);
};

module.exports = tester.run([
    tester.make("assert() should not display the passed message when the passed value is a truthy", () => {
        return callAssert(true, "test", (_, called) => {
            return !called;
        });
    }),

    tester.make("assert() should display the passed message when the passed value is a falsy", () => {
        const message = "3";

        return callAssert(false, message, (_, called, calledWith) => {
            return called && calledWith === message;
        });
    }),

    tester.make("assert() should always return `truthy` no matter what", () => {
        const truthy = 3;
        const falsy  = 0;

        const checkReturnValue = value => returnValue => returnValue === value;

        return (
            callAssert(truthy, "test", checkReturnValue(truthy))
            && callAssert(falsy, "test", checkReturnValue(falsy))
        );
    })
]);
