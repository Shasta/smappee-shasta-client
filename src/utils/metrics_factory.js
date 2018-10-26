const moment = require('moment');
const ipfsHashFromString = require('./ipfs_hash.js')

const metricsFactory = async (hwId, priorConsumed, priorProduced, priorTimestamp) => {
  let watts_consumed = "TODO";
  let watts_produced = "TODO";
  let timestamp = moment().unix();

  if (!!priorConsumed && Number.isInteger(priorConsumed)) {
    watts_consumed += priorConsumed;
  }

  if (!!priorProduced && Number.isInteger(priorProduced)) {
    watts_produced += priorProduced
  }
  if (!!priorTimestamp && Number.isInteger(priorTimestamp)) {
    timestamp = moment.unix(priorTimestamp).add(12, 'hours').unix();
  }

  const metrics = {
    timestamp,
    watts_consumed,
    watts_produced,
  };

  console.log('timestamp', moment.unix(metrics.timestamp));

  const metrics_json = JSON.stringify(metrics);
  const ipfs_hash = await ipfsHashFromString(metrics_json);

  console.log("ipfs hash", ipfs_hash);

  return ({
    hardware_id: !!hwId ? hwId : faker.random.uuid(),
    ipfs_hash, 
    metrics
  });
}

module.exports = metricsFactory;