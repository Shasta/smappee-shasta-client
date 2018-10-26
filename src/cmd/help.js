const menus = {
  main: `Usage:
  smappee-client [command] <options>
  
Commands:
  start ........... run the smappee client with the
  help ............... show help menu for a command`,

  start: `Usage:
  smappee-client start <options>

Description:
  Saves the state of the counter into IPFS and into a REST API, per interval. 
  By default it uses Infura IPFS, the target REST API is http://localhost:5050, metrics are read every 5000ms and the

Options:
  --interval, -i ... the interval in milliseconds to persist the current kWh counter into IPFS and into the metrics/backups REST API,  ignores \'stamp_interval\' config variable
  --polling, -p ..... the interval in milliseconds to read the current power from the smappee hub and calculate metrics, by default every 5000 ms, ignores \'polling\' config variable
  --rest-target, -T ..... the target URL to send the HTTP request, ignores \'rest_target\' config variable
  --ipfs-target, -I ..... the target IPFS gateway to store the metrics, ignore \'ipfs_target\' config variable
  --daemon, -d .... todo: the client will run in background and in daemon mode, ignore \'daemon\' config variable
  --hw-id, -h ........ the unique hardware id, ignores the generated hardware id in the persistent storage.
  --from, -f ........ the counter starting point, ignores persistent storage 
Example:
  # Run the smappe-client with the config parameters from config/default and reading the persistent database at db/counter
  smappee-client start`
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}