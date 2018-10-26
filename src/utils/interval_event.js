const EventEmitter = require('events');
const _ = require('lodash');

const storage = require('node-persist');
const smappee = require('../smappee/public_api');

class IntervalEvent extends EventEmitter {

  constructor(options) {
    super();
    this.polling_handler = undefined;
    this.stamping_handler = undefined;

    this.options = _.cloneDeep(options);
    this.metrics = [];
    this.addListener('pull_stats', this.pullStats);
    this.addListener('stamp', this.stamp);
  }
  
  start() {
    // Start polling
    this.emit('pull_stats')
    // Start stamping timer interval
    this.stampingTimeout();
  }

  stop(forced) {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = undefined;
    }
    if (forced) {
      console.log("Exit interval due error.")
      process.exit(2);
    }
    console.log("Finished interval")
    process.exit(0);
  }

  pollingTimeout() {
    if (this.polling_handler) {
      clearTimeout(this.polling_handler);
    }
    this.polling_handler = setTimeout(() => this.emit('pull_stats'), this.options.polling_interval);
  }

  stampingTimeout() {
    if (this.stamping_handler) {
      clearTimeout(this.stamping_handler);
    }
    this.polling_handler = setTimeout(() => this.emit('stamp'), this.options.stamping_interval);
  }

  pullStats() {
    try {
      const currentPower = smappee.readPower();
      this.metrics.push(currentPower);
    } catch (error) {
      console.log('client:error', error);
    }
    console.log('polling done');
    this.pollingTimeout();
  }
  
  cleanMetrics() {
    this.metrics = [];
  }

  async stamp() {
    console.log('Started stamping')
    const clonedReadings = _.cloneDeep(this.metrics);
    this.cleanMetrics();
    const meanWatts = _.mean(clonedReadings);

    /**
     * To get the current Watts usage if the stamping interval is less than an hour
     * we need to know the fraction of the hour.
     *
     * Example:
     * Want the electrical metrics counter to grow every 30 minutes, the 'stamping_interval' option is set to 1.800.000 ms (milliseconds)
     * The "hourFraction" is 3600000 / 1800000, resulting 2, so wattsPower / hourFraction = "Watts consumed in half an hour"
     */
    const hourFraction = 3600000 / this.options.stamping_interval;
    const consumedWatts = Math.round(meanWatts / hourFraction);
    
    console.log('Current comsupmtion during the interval', `${consumedWatts} Watts`)
    const wattsCounter = await storage.getItem('watts_counter');
    await storage.setItem('watts_counter', wattsCounter + consumedWatts);
    const wattsCounterAfter = await storage.getItem('watts_counter');
    console.log('Counter:', `${wattsCounterAfter * 1000} kWh`);
    
    // TODO: Save to IPFS
    // TODO: Save to REST API
    console.log('Finished stamping')
    this.stampingTimeout()
  }


}

module.exports = IntervalEvent;