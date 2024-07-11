"use strict";

const tester             = require("./framework");
const EventEmitter       = require("events").EventEmitter;
const addOneTimeListener = require("../source/add-one-time-listener");

module.exports = tester.run([
    tester.make("addOneTimeListener() should work with NodeJS event emitters", () => {
        let a = 0;

        const emitter   = new EventEmitter;
        const eventName = "eventName";
        const λ         = () => a++;

        addOneTimeListener(emitter, eventName, λ);

        emitter.emit(eventName);
        emitter.emit(eventName);

        return a === 1;
    }),

    tester.make("addOneTimeListener() should work event when the target does not have a once() method", () => {
        let a = 0;

        const emitter   = new EventEmitter;
        const eventName = "eventName";
        const λ         = () => a++;

        emitter.once = undefined;

        addOneTimeListener(emitter, eventName, λ);

        emitter.emit(eventName);
        emitter.emit(eventName);

        return a === 1;
    }),

    tester.make("addOneTimeListener() should properly forward arguments", () => {
        let a = 0;
        let x = 5;

        const emitter   = new EventEmitter;
        const eventName = "eventName";
        const λ         = x => a = x;

        addOneTimeListener(emitter, eventName, λ);

        emitter.emit(eventName, x);

        return a === x;
    }),
]);
