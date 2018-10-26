const MetricsFactory = require('./metrics_factory.js');
const axios = require('axios');

const MetricsRequest = async (target, metric) => {
  return axios.post(target, metric)
  .then(result => ({
      axios: result,
      data: metric
  }))
}

module.exports = MetricsRequest;