#!/bin/bash

# Wait for shard1 to start
until mongo --host mongo-shard1:27017 --eval "print('Waiting for mongo-shard1 connection...')" 2>/dev/null; do
  sleep 5
done

# Initiate replica set for shard1
mongo --host mongo-shard1:27017 --eval '
rs.initiate({
  _id: "shard1ReplSet",
  members: [
    { _id: 0, host: "mongo-shard1:27017" }
  ]
});
rs.status();
'

# Wait for shard2 to start
until mongo --host mongo-shard2:27017 --eval "print('Waiting for mongo-shard2 connection...')" 2>/dev/null; do
  sleep 5
done

# Initiate replica set for shard2
mongo --host mongo-shard2:27017 --eval '
rs.initiate({
  _id: "shard2ReplSet",
  members: [
    { _id: 0, host: "mongo-shard2:27017" }
  ]
});
rs.status();
'

# Wait for shard3 to start
until mongo --host mongo-shard3:27017 --eval "print('Waiting for mongo-shard3 connection...')"
