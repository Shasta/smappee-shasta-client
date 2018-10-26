const config = require('config');
const IPFS = require('ipfs-api');

const host = config.get('ipfs_target_url');
const port = config.get('ipfs_target_port');
const protocol = config.get('ipfs_target_protocol');

const ipfs = new IPFS({ host, port, protocol });

module.exports = ipfs;