const config = require('config');

function initConfig (args) {
  // TODO: listen arguments to ignore config parameters
  const smappee_hub = config.get('smappee_hub');
  const smappee_pass = config.get('smappee_pass');
  const ipfs_target_url = config.get('ipfs_target_url');
  const ipfs_target_port = config.get('ipfs_target_port');
  const ipfs_target_protocol = config.get('ipfs_target_protocol');
  const rest_target_url = config.get('rest_target_url');
  const stamping_interval = config.get('stamping_interval');
  const polling_interval = config.get('polling_interval');

  return ({
    smappee_hub,
    smappee_pass,
    ipfs_target_url,
    ipfs_target_port,
    ipfs_target_protocol,
    rest_target_url,
    stamping_interval,
    polling_interval
  });
}

module.exports = initConfig;