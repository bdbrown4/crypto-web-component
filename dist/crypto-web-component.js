/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".container {\n  background-color: antiquewhite;\n  border-radius: 25px;\n  text-align: center;\n  padding: 20px;\n  width: 30%;\n}\n\np {\n  color: #f7931a;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  text-align: center;\n}");

/***/ }),
/* 2 */
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BtcImgComponent": () => (/* binding */ BtcImgComponent)
/* harmony export */ });
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _services_style_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _styles_btc_img_component_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _templates_btc_img_component_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);





class BtcImgComponent extends HTMLElement {
    constructor() {
        super();
        this.styleLoaderService = new _services_style_loader_service__WEBPACK_IMPORTED_MODULE_2__.StyleLoaderService();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = _templates_btc_img_component_html__WEBPACK_IMPORTED_MODULE_4__["default"];
        _redux_store__WEBPACK_IMPORTED_MODULE_1__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_0__.LoadBtcImgTemplateAction.loadBtcImgTemplateSuccess({ componentShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(_styles_btc_img_component_scss__WEBPACK_IMPORTED_MODULE_3__["default"], this.shadowRoot);
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
}
window.customElements.define('btc-img-component', BtcImgComponent);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoDataAction": () => (/* binding */ CryptoDataAction),
/* harmony export */   "CryptoTickerAction": () => (/* binding */ CryptoTickerAction),
/* harmony export */   "SelectedCryptoTickerAction": () => (/* binding */ SelectedCryptoTickerAction),
/* harmony export */   "LoadBtcImgTemplateAction": () => (/* binding */ LoadBtcImgTemplateAction),
/* harmony export */   "LoadCryptoDataListTemplateAction": () => (/* binding */ LoadCryptoDataListTemplateAction),
/* harmony export */   "LoadCryptoWebTemplateAction": () => (/* binding */ LoadCryptoWebTemplateAction),
/* harmony export */   "LoadCryptoButtonTemplateAction": () => (/* binding */ LoadCryptoButtonTemplateAction)
/* harmony export */ });
class CryptoDataAction {
    static loadCryptoDataSuccess(model) {
        return {
            payload: model,
            type: CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS,
        };
    }
}
CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS = '[Crypto Web Component] LOAD_CRYPTO_DATA_LIST_SUCCESS';
class CryptoTickerAction {
    static loadCryptoTickerSuccess(model) {
        return {
            payload: model,
            type: CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS,
        };
    }
}
CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS = '[Crypto Web Component] LOAD_CRYPTO_TICKER_DATA_SUCCESS';
class SelectedCryptoTickerAction {
    static loadSelectedCryptoTickerSuccess(model) {
        return {
            payload: model,
            type: SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS,
        };
    }
}
SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS = '[Crypto Web Component] LOAD_SELECTED_CRYPTO_TICKER_SUCCESS';
class LoadBtcImgTemplateAction {
    static loadBtcImgTemplateSuccess(model) {
        return {
            payload: model,
            type: LoadBtcImgTemplateAction.LOAD_BTC_IMG_TEMPLATE_SUCCESS,
        };
    }
}
LoadBtcImgTemplateAction.LOAD_BTC_IMG_TEMPLATE_SUCCESS = '[Crypto Web Component] LOAD_BTC_IMG_TEMPLATE_SUCCESS';
class LoadCryptoDataListTemplateAction {
    static loadCryptoDataListTemplateSuccess(model) {
        return {
            payload: model,
            type: LoadCryptoDataListTemplateAction.LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS,
        };
    }
}
LoadCryptoDataListTemplateAction.LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS = '[Crypto Web Component] LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS';
class LoadCryptoWebTemplateAction {
    static loadCryptoWebTemplateSuccess(model) {
        return {
            payload: model,
            type: LoadCryptoWebTemplateAction.LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS,
        };
    }
}
LoadCryptoWebTemplateAction.LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS = '[Crypto Web Component] LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS';
class LoadCryptoButtonTemplateAction {
    static loadCryptoButtonTemplateSuccess(model) {
        return {
            payload: model,
            type: LoadCryptoButtonTemplateAction.LOAD_CRYPTO_BUTTON_TEMPLATE_SUCCESS,
        };
    }
}
LoadCryptoButtonTemplateAction.LOAD_CRYPTO_BUTTON_TEMPLATE_SUCCESS = '[Crypto Web Component] LOAD_CRYPTO_BUTTON_TEMPLATE_SUCCESS';


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoStore": () => (/* binding */ CryptoStore)
/* harmony export */ });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const CryptoStore = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducer__WEBPACK_IMPORTED_MODULE_0__.reducer);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reducer": () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

const initialState = {
    cryptoData: {
        id: '',
        name: ''
    },
    cryptoTicker: {
        price: 0
    },
    selectedCryptoTicker: '',
    uiTemplateState: {
        btcImgTemplate: null,
        cryptoDataListTemplate: null,
        cryptoWebTemplate: null,
        cryptoButtonTemplate: null
    }
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case _actions__WEBPACK_IMPORTED_MODULE_0__.CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS: {
            return Object.assign(Object.assign({}, state), { cryptoData: action.payload });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS: {
            return Object.assign(Object.assign({}, state), { cryptoTicker: action.payload });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS: {
            return Object.assign(Object.assign({}, state), { selectedCryptoTicker: action.payload });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.LoadBtcImgTemplateAction.LOAD_BTC_IMG_TEMPLATE_SUCCESS: {
            return Object.assign(Object.assign({}, state), { uiTemplateState: Object.assign(Object.assign({}, state.uiTemplateState), { btcImgTemplate: action.payload }) });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.LoadCryptoDataListTemplateAction.LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS: {
            return Object.assign(Object.assign({}, state), { uiTemplateState: Object.assign(Object.assign({}, state.uiTemplateState), { cryptoDataListTemplate: action.payload }) });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.LoadCryptoWebTemplateAction.LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS: {
            return Object.assign(Object.assign({}, state), { uiTemplateState: Object.assign(Object.assign({}, state.uiTemplateState), { cryptoWebTemplate: action.payload }) });
        }
        case _actions__WEBPACK_IMPORTED_MODULE_0__.LoadCryptoButtonTemplateAction.LOAD_CRYPTO_BUTTON_TEMPLATE_SUCCESS: {
            return Object.assign(Object.assign({}, state), { uiTemplateState: Object.assign(Object.assign({}, state.uiTemplateState), { cryptoButtonTemplate: action.payload }) });
        }
        default: {
            return state;
        }
    }
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__DO_NOT_USE__ActionTypes": () => (/* binding */ ActionTypes),
/* harmony export */   "applyMiddleware": () => (/* binding */ applyMiddleware),
/* harmony export */   "bindActionCreators": () => (/* binding */ bindActionCreators),
/* harmony export */   "combineReducers": () => (/* binding */ combineReducers),
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "createStore": () => (/* binding */ createStore)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (({}).NODE_ENV !== 'production') {
    typeOfVal = miniKindOf(val);
  }

  return typeOfVal;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }

    if (isDispatching) {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }

    if (typeof action.type === 'undefined') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }

    if (isDispatching) {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(12) : "The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(13) : "The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (({}).NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (({}).NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (({}).NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error(({}).NODE_ENV === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (({}).NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StyleLoaderService": () => (/* binding */ StyleLoaderService)
/* harmony export */ });
class StyleLoaderService {
    constructor() { }
    loadStylesIntoShadowRoot(styleSheetText, shadowRoot) {
        const styles = document.createElement('style');
        styles.appendChild(document.createTextNode(styleSheetText));
        shadowRoot.appendChild(styles);
    }
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("img {\n  height: 75px;\n}");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<img src=\"data:image/png;base64,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\" />";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoDataListComponent": () => (/* binding */ CryptoDataListComponent)
/* harmony export */ });
/* harmony import */ var _templates_crypto_data_list_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _styles_crypto_data_list_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _services_style_loader_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class CryptoDataListComponent extends HTMLElement {
    constructor() {
        super();
        this.cryptoCurrency = '';
        this.styleLoaderService = new _services_style_loader_service__WEBPACK_IMPORTED_MODULE_2__.StyleLoaderService();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = _templates_crypto_data_list_component_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_4__.LoadCryptoDataListTemplateAction.loadCryptoDataListTemplateSuccess({ componentShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(_styles_crypto_data_list_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"], this.shadowRoot);
        this.fetchDataListOptions();
    }
    get cryptoCurrencyValue() {
        return this.cryptoCurrency;
    }
    set setCryptoCurrencyValue(val) {
        this.cryptoCurrency = val;
        _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_4__.SelectedCryptoTickerAction.loadSelectedCryptoTickerSuccess(val));
    }
    connectedCallback() {
        this.shadowRoot.querySelector('#cryptocurrency')
            .addEventListener('input', this.activateButton.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#cryptocurrency')
            .removeEventListener('input', this.activateButton.bind(this));
    }
    fetchDataListOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = 'https://api.exchange.coinbase.com/currencies';
            const response = yield fetch(uri, {
                method: 'GET'
            }).then(data => data.json())
                .catch(err => console.log(err));
            _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_4__.CryptoDataAction.loadCryptoDataSuccess(response));
            const datalist = this.shadowRoot.querySelector('#cryptocurrencies');
            response.forEach((crypto) => {
                const option = document.createElement('option');
                option.value = crypto.id;
                option.innerText = `${crypto.name} - ${crypto.id}`;
                datalist.appendChild(option);
            });
        });
    }
    activateButton() {
        const state = _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.getState();
        const div = state.uiTemplateState.cryptoWebTemplate.componentShadowRoot.querySelector('#cryptovalue');
        div.innerHTML = '';
        div.hidden = true;
        const selection = this.shadowRoot.querySelector('#cryptocurrency');
        this.setCryptoCurrencyValue = selection.value;
        const button = state.uiTemplateState.cryptoButtonTemplate.componentShadowRoot.querySelector('#fetchCryptoValue');
        button.disabled = this.cryptoCurrency ? false : true;
    }
}
window.customElements.define('crypto-data-list-component', CryptoDataListComponent);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<input list='cryptocurrencies' id='cryptocurrency'>\r\n<datalist id='cryptocurrencies'>\r\n</datalist>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("input {\n  border-radius: 25px;\n  border-style: inset;\n  color: #f7931a;\n  display: inline-block;\n  font-weight: 600;\n  margin-top: 12px;\n  min-width: 115px;\n  padding: 9px 9px 9px 12px;\n  width: inherit;\n}\n\nbutton {\n  background-color: #f7931a;\n  border-radius: 25px;\n  border-style: none;\n  color: mintcream;\n  font-family: Georgia, serif;\n  font-size: 16px;\n  margin-top: 12px;\n  padding: 8px;\n}\n\np {\n  color: #f7931a;\n  font-family: Georgia, serif;\n  font-size: 24px;\n  text-align: center;\n}");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoButtonComponent": () => (/* binding */ CryptoButtonComponent)
/* harmony export */ });
/* harmony import */ var _templates_crypto_button_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _styles_crypto_button_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _services_style_loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class CryptoButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.styleLoaderService = new _services_style_loader_service__WEBPACK_IMPORTED_MODULE_4__.StyleLoaderService();
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = _templates_crypto_button_component_html__WEBPACK_IMPORTED_MODULE_0__["default"];
        _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_2__.LoadCryptoButtonTemplateAction.loadCryptoButtonTemplateSuccess({ componentShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(_styles_crypto_button_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"], this.shadowRoot);
    }
    connectedCallback() {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .addEventListener('click', this.fetchCryptoCurrency.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .removeEventListener('click', this.fetchCryptoCurrency.bind(this));
    }
    fetchCryptoCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const state = _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.getState();
            const uri = `https://api.exchange.coinbase.com/products/${state.selectedCryptoTicker}-usd/ticker`;
            const response = yield fetch(uri, {
                method: 'GET'
            }).then(data => data.json())
                .catch(err => console.log(err));
            _redux_store__WEBPACK_IMPORTED_MODULE_3__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_2__.CryptoTickerAction.loadCryptoTickerSuccess(response));
            const div = state.uiTemplateState.cryptoWebTemplate.componentShadowRoot.querySelector('#cryptovalue');
            const para = document.createElement('p');
            para.setAttribute('part', 'p');
            para.innerHTML = response.message ?
                `There was an error fetching ${state.selectedCryptoTicker} from Coinbase.` :
                this.formatter.format(response.price * 100 / 100);
            if (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            div.appendChild(para);
            div.hidden = false;
        });
    }
}
window.customElements.define('crypto-button-component', CryptoButtonComponent);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<button disabled='true' id='fetchCryptoValue'>Fetch a cryptocurrency</button>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("button {\n  background-color: #f7931a;\n  border-radius: 25px;\n  border-style: none;\n  color: mintcream;\n  font-family: Georgia, serif;\n  font-size: 16px;\n  margin-top: 12px;\n  padding: 8px;\n}");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<div class='container'>\r\n    <btc-img-component></btc-img-component>\r\n    <br>\r\n    <crypto-data-list-component></crypto-data-list-component>\r\n    <crypto-button-component></crypto-button-component>\r\n    <div id='cryptovalue' hidden='true'>\r\n    </div>\r\n</div>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoWebComponent": () => (/* binding */ CryptoWebComponent)
/* harmony export */ });
/* harmony import */ var _styles_crypto_web_component_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _btc_img_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _crypto_data_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _crypto_button_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _templates_crypto_web_component_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _services_style_loader_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4);









class CryptoWebComponent extends HTMLElement {
    constructor() {
        super();
        this.styleLoaderService = new _services_style_loader_service__WEBPACK_IMPORTED_MODULE_6__.StyleLoaderService();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = _templates_crypto_web_component_html__WEBPACK_IMPORTED_MODULE_5__["default"];
        _redux_store__WEBPACK_IMPORTED_MODULE_7__.CryptoStore.dispatch(_redux_actions__WEBPACK_IMPORTED_MODULE_8__.LoadCryptoWebTemplateAction.loadCryptoWebTemplateSuccess({ componentShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(_styles_crypto_web_component_scss__WEBPACK_IMPORTED_MODULE_0__["default"], this.shadowRoot);
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
}
window.customElements.define('crypto-web-component', CryptoWebComponent);

})();

/******/ })()
;