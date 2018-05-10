"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preArrayOf;
function preArrayOf(index, detect, convert) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Array.isArray(args[index])) {
      args[index] = args[index].map(function (item) {
        return detect(item) ? convert(item) : item;
      });
    }

    return args;
  };
}
//# sourceMappingURL=pre-array-of.js.map