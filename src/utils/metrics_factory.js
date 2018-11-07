const moment = require('moment');
const {ipfsAddString} = require('./ipfs_hash.js')

const metricsFactory = async (hwId, totalConsumed, totalProduced, priorTimestamp) => {

  let timestamp = moment().unix();

  if (!!priorTimestamp && Number.isInteger(priorTimestamp)) {
    timestamp = moment.unix(priorTimestamp).add(12, 'hours').unix();
  }
  const hardware_id = !!hwId ? hwId : faker.random.uuid();
  const metrics = {
    hardware_id,
    timestamp,
    watts_consumed: totalConsumed,
    watts_produced: totalProduced
  };

  console.log('timestamp', moment.unix(metrics.timestamp));

  const metrics_json = JSON.stringify(metrics);

  //Add to ipfs
  const ipfs_hash = await ipfsAddString(metrics_json);

  console.log("ipfs hash", ipfs_hash);

  return ({
    hardware_id,
    ipfs_hash, 
    metrics
  });
}

module.exports = metricsFactory;