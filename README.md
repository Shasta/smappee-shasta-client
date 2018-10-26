# Smappee electrical counter
This CLI tool reads a Smappee monitor hub data, acts as an electric meter prototype, stamp the metrics to IPFS and also sends the metrics into a common REST API for backup purposes.

## Features
- Reads Smappee Enery Monitor directly from the local web server.
- Persistent storage: The client can load the prior metrics from a local database, to be able to know the current kWh history.
- Stamping to IPFS: Every hour the electrical meter sends a copy of the actual state of the counter into IPFS.
- Backup and metrics via REST API: Once the state of the counter is saved in IPFS, it is also sent to a common REST API, to backup the metrics in a second MongoDB database.

## Problems
- This service must be always on. Any minimum failure that can cause the service to go down will result in a loss of metrics during the duration of the downtime.