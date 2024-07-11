"use strict";

const tester    = require("./framework");
const regularly = require("../source/regularly");

module.exports = tester.run([
    tester.make("regularly() should create a polling loop", () => new Promise(resolve => {
        let executionsCount = 0;

        const λ = () => Promise.resolve(executionsCount++);

        const pollingλ = regularly(λ, 0);

        pollingλ();

        setTimeout(() => {
            pollingλ.stop();

            resolve(executionsCount > 1);
        }, 20);
    })),

    tester.make("regularly() should allow manual calls", () => new Promise(async resolve => {
        let executionsCount = 0;

        const λ = () => Promise.resolve(executionsCount++);

        const pollingλ = regularly(λ, 100000);

        await pollingλ().then(pollingλ);

        setTimeout(() => {
            pollingλ.stop();

            resolve(executionsCount === 2);
        }, 20);
    })),

    tester.make("regularly() should allow to resume polling after it was stopped", () => new Promise(async resolve => {
        let executionsCount = 0;

        const λ = () => Promise.resolve(executionsCount++);

        const pollingλ = regularly(λ, 100000);

        await pollingλ();

        pollingλ.stop();

        await pollingλ();

        setTimeout(() => {
            pollingλ.stop();

            resolve(executionsCount === 2);
        }, 20);
    })),

    tester.make("regularly() should call the passed error handler when λ throws", async () => {
        let wasCalled = false;

        const λ            = () => Promise.reject();
        const errorHandler = () => wasCalled = true;

        const pollingλ = regularly(λ, 100000, errorHandler);

        await pollingλ();

        pollingλ.stop();

        return wasCalled === true;
    })
]);
