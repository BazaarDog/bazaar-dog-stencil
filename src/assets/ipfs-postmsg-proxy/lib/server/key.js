'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (getIpfs, opts) {
  return {
    gen: (0, _postmsgRpc.expose)('ipfs.key.gen', (0, _prepost.pre)(opts.pre('key.gen'), function () {
      var _getIpfs$key;

      return (_getIpfs$key = getIpfs().key).gen.apply(_getIpfs$key, arguments);
    }), opts),
    list: (0, _postmsgRpc.expose)('ipfs.key.list', (0, _prepost.pre)(opts.pre('key.list'), function () {
      return getIpfs().key.list();
    }), opts),
    rename: (0, _postmsgRpc.expose)('ipfs.key.rename', (0, _prepost.pre)(opts.pre('key.rename'), function () {
      var _getIpfs$key2;

      return (_getIpfs$key2 = getIpfs().key).rename.apply(_getIpfs$key2, arguments);
    }), opts),
    rm: (0, _postmsgRpc.expose)('ipfs.key.rm', (0, _prepost.pre)(opts.pre('key.rm'), function () {
      var _getIpfs$key3;

      return (_getIpfs$key3 = getIpfs().key).rm.apply(_getIpfs$key3, arguments);
    }), opts)
  };
};

var _postmsgRpc = require('postmsg-rpc');

var _prepost = require('prepost');
//# sourceMappingURL=key.js.map