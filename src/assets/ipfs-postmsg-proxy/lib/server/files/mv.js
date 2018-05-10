'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getIpfs, opts) {
  return {
    mv: (0, _postmsgRpc.expose)('ipfs.files.mv', (0, _prepost.pre)(opts.pre('files.mv'), function () {
      var _getIpfs$files;

      return (_getIpfs$files = getIpfs().files).mv.apply(_getIpfs$files, arguments);
    }), opts)
  };
};

var _postmsgRpc = require('postmsg-rpc');

var _prepost = require('prepost');
//# sourceMappingURL=mv.js.map