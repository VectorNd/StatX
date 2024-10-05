#!/bin/bash

# Start the mongod process in the background to run as the config server

echo "MongoDB config server is running."
mongod --configsvr --replSet configReplSet --port 27017 --dbpath /data/configdb --bind_ip_all &

# Wait for the mongod process to fully start up
until mongod --host mongo-config --port 27017 "print('Waiting for config server connection...')" 2>/dev/null; do
  sleep 5
done

echo "MongoDB config server is running."

# Initiate the replica set
mongod --host mongo-config --port 27017 '
rs.initiate({
  _id: "configReplSet",
  configsvr: true,
  members: [
    { _id: 0, host: "mongo-config:27017" }
  ]
})'; then
  echo "Replica set initiated successfully."
else
  echo "Error initiating replica set."
fi



# Create the required collection if it doesn't exist
if mongo --host mongo-config --eval '
db.getSiblingDB("config").createCollection("image_collection");
'; then
  echo "Collection 'image_collection' created successfully."
else
  echo "Error creating collection 'image_collection'."
fi


# Print the replica set status
mongo --host mongo-config --eval 'rs.status()'
echo "Initialization complete. Keeping the container running."

# Keep the container running with the mongod process in the foreground
wait
