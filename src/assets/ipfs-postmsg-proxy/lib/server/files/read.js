'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getIpfs, opts) {
  return {
    read: (0, _postmsgRpc.expose)('ipfs.files.read', (0, _prepost.pre)(opts.pre('files.read'), (0, _prepost.post)(function () {
      var _getIpfs$files;

      return (_getIpfs$files = getIpfs().files).read.apply(_getIpfs$files, arguments);
    }, _buffer.bufferToJson)), opts)
  };
};

var _postmsgRpc = require('postmsg-rpc');

var _prepost = require('prepost');

var _buffer = require('../../serialization/buffer');
//# sourceMappingURL=read.js.map