'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getIpfs, opts) {
  return {
    cp: (0, _postmsgRpc.expose)('ipfs.files.cp', (0, _prepost.pre)(opts.pre('files.cp'), function () {
      var _getIpfs$files;

      return (_getIpfs$files = getIpfs().files).mkdir.apply(_getIpfs$files, arguments);
    }), opts)
  };
};

var _postmsgRpc = require('postmsg-rpc');

var _prepost = require('prepost');
//# sourceMappingURL=cp.js.map