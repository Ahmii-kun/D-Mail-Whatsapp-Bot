"use strict";

/**
 * Utility function to emulate jQuery's one() on targets that don't have it. Basically,
 * this adds an event listener on `target` that will be executed once, then removed.
 *
 * Careful! `this` is not bound! Also, for DOM events, the event is not automatically
 * transformed into an Event, so you have to take care of this yourself.
 *
 * @see      http://api.jquery.com/one/
 * @function addOneTimeListener
 *
 * @param target {EventEmitterType} Any object that has on/off, addListener/removeListener,
 *                                  addEventListener/removeEventListener or once methods.
 * @param event  {Event}            The event to listen for.
 * @param λ      {Function}         The event handler
 */
module.exports = (target, event, λ) => {
    if (target.once) {
        target.once(event, λ);

        return;
    }

    let on  = target.on || target.addListener || target.addEventListener;
    let off = target.off || target.removeListener || target.removeEventListener;

    const handler = function () {
        off.call(target, event, handler);

        λ(...arguments);
    };

    on.call(target, event, handler);
};
