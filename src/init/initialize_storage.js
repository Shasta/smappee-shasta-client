const storage = require('node-persist');
const uuidv4 = require('uuid/v4');

const initializeStorage = async () => {
  // Init the storage from the relative path './.storage'
  await storage.init({
    dir: './.storage',
  });

  // Read the current stored values from the filesystem
  let hwId = await storage.getItem('hardware_id');
  let wattsCounter = await storage.getItem('watts_counter');

  // If hwId is not set, create a new hardware id
  if (!hwId ) {
    await storage.clear();
    // Create a probably unique id with UUID/v4
    const uniqueId = uuidv4();

    // Store initial value into filesystem with key 'hardware_id'
    await storage.setItem('hardware_id', uniqueId);

    // Retrieve the hardware id
    hwId = await storage.getItem('hardware_id');
  }

  if (!wattsCounter) {
    // Set kWh counter to zero
    const counterInit = 0;
    
    // Store initial value into filesystem with key 'kwh_counter'
    await storage.setItem('watts_counter', counterInit);
    kWhCounter = await storage.getItem('watts_counter');
  }
    
  return ({
    hardware_id: hwId,
    watts_counter: wattsCounter,
  });
}

module.exports = initializeStorage;