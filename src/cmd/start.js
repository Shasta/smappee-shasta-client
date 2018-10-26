const IntervalEvent = require('../utils/interval_event.js');

// Init handlers
const initializeStorage = require('../init/initialize_storage');
const initializeConfig = require('../init/initialize_config');

module.exports = async (args) => {
  // TODO: Pass arguments to replace options
  const config = initializeConfig();
  const initialState = await initializeStorage();
  console.log('Hardware ID:', initialState.hardware_id);
  console.log('Counter:', `${initialState.watts_counter} kWh`);

  const intervalEvent = new IntervalEvent(config);
  intervalEvent.start();
}