const IntervalEvent = require('../utils/interval_event.js');

// Init handlers
const initializeStorage = require('../init/initialize_storage');
const initializeConfig = require('../init/initialize_config');

module.exports = async (args) => {
  // TODO: Pass arguments to replace options
  const config = initializeConfig();
  const initialState = await initializeStorage();
  let kwhCounter = 0;
  if (initialState.watts_counter > 0) {
    kwhCounter = initialState.watts_counter / 1000;
  }
  console.log('Hardware ID:', initialState.hardware_id);
  console.log('Counter:', `${kwhCounter} kWh`);

  const intervalEvent = new IntervalEvent(config);
  intervalEvent.start();
}