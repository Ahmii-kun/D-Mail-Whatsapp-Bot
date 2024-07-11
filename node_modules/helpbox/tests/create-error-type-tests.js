"use strict";

const tester          = require("./framework");
const createErrorType = require("../source/create-error-type");

module.exports = tester.run([
    tester.make("createErrorType() create the right hierarchy", () => {
        const TestError = createErrorType();

        const instance = TestError();

        return instance instanceof Error && instance instanceof TestError;
    }),

    tester.make("createErrorType() should create constructors that assume their first parameter is a message", () => {
        const TestError = createErrorType();
        const message   = "A";

        return TestError(message).message === message;
    }),

    tester.make("createErrorType() should allow to specify a prototype", () => {
        const b = {};

        const prototype = { a: {}, b: () => b };

        const TestError = createErrorType(null, null, prototype);

        const instance = new TestError;

        return instance.a === prototype.a && instance.b() === b;
    }),

    tester.make("createErrorType() should allow to specify an initialization function", () => {
        const message          = "j";
        const transformMessage = message => `i${message}`;

        const TestError = createErrorType(function (self, message) {
            self.message = transformMessage(message);
        });

        return TestError(message).message = transformMessage(message);
    }),

    tester.make("createErrorType() should initialize the stack property", () => {
        return createErrorType()().stack;
    }),

    tester.make("createErrorType() should allow to subclass Error subclasses", () => {
        const Base = createErrorType();

        const Child = createErrorType(null, Base);

        const instance = new Child;

        return instance instanceof Child && instance instanceof Base && instance instanceof Error;
    })
]);
